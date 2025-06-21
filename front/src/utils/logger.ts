/**
 * Minimal Logger System [SF, DM, SFT]
 * 
 * Lightweight logging utility with environment-based configuration
 * Replaces console.log/error statements for production safety
 * Zero external dependencies, TypeScript-first design
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  entityId?: string;
  [key: string]: any;
}

class Logger {
  private currentLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    // In development: show all logs, in production: only errors
    this.currentLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.ERROR;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.currentLevel;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? `[${Object.entries(context).map(([k, v]) => `${k}:${v}`).join(',')}]` : '';
    
    return `${timestamp} ${levelName} ${contextStr} ${message}`;
  }

  debug(message: string, context?: LogContext, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.log(this.formatMessage(LogLevel.DEBUG, message, context), data);
      } else {
        console.log(this.formatMessage(LogLevel.DEBUG, message, context));
      }
    }
  }

  info(message: string, context?: LogContext, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.info(this.formatMessage(LogLevel.INFO, message, context), data);
      } else {
        console.info(this.formatMessage(LogLevel.INFO, message, context));
      }
    }
  }

  warn(message: string, context?: LogContext, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.warn(this.formatMessage(LogLevel.WARN, message, context), data);
      } else {
        console.warn(this.formatMessage(LogLevel.WARN, message, context));
      }
    }
  }

  error(message: string, context?: LogContext, error?: Error | any): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    // Always log errors, even in production (but structured)
    const errorInfo = error instanceof Error 
      ? { name: error.name, message: error.message, stack: error.stack }
      : error;

    if (this.isDevelopment) {
      console.error(this.formatMessage(LogLevel.ERROR, message, context), errorInfo);
    } else {
      // In production, you might want to send to error tracking service
      // For now, just use console.error with structured data
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        context,
        error: errorInfo
      }));
    }
  }

  // Convenience methods for common use cases
  apiCall(method: string, url: string, context?: LogContext): void {
    this.debug(`API ${method} ${url}`, { ...context, type: 'api' });
  }

  apiResponse(method: string, url: string, status: number, context?: LogContext): void {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.DEBUG;
    const message = `API ${method} ${url} - ${status}`;
    
    if (level === LogLevel.ERROR) {
      this.error(message, { ...context, type: 'api', status });
    } else {
      this.debug(message, { ...context, type: 'api', status });
    }
  }

  userAction(action: string, context?: LogContext): void {
    this.info(`User action: ${action}`, { ...context, type: 'user' });
  }

  componentMount(componentName: string): void {
    this.debug(`Component mounted: ${componentName}`, { component: componentName, type: 'lifecycle' });
  }

  componentUnmount(componentName: string): void {
    this.debug(`Component unmounted: ${componentName}`, { component: componentName, type: 'lifecycle' });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions for easier migration from console.log
export const log = {
  debug: (message: string, context?: LogContext, data?: any) => logger.debug(message, context, data),
  info: (message: string, context?: LogContext, data?: any) => logger.info(message, context, data),
  warn: (message: string, context?: LogContext, data?: any) => logger.warn(message, context, data),
  error: (message: string, context?: LogContext, error?: any) => logger.error(message, context, error),
  
  // Convenience methods
  api: (method: string, url: string, context?: LogContext) => logger.apiCall(method, url, context),
  apiResponse: (method: string, url: string, status: number, context?: LogContext) => 
    logger.apiResponse(method, url, status, context),
  userAction: (action: string, context?: LogContext) => logger.userAction(action, context),
  mount: (componentName: string) => logger.componentMount(componentName),
  unmount: (componentName: string) => logger.componentUnmount(componentName)
};

export default logger;
