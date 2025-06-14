/**
 * 🎨 Design System - Status Badges
 * Componente riutilizzabile per badge di stato con varianti predefinite
 */

import React from "react";
import { cn } from "../../utils/cn";

const statusVariants = {
  published: "bg-blue-50 text-blue-700 border-blue-200",
  inProgress: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
  draft: "bg-gray-50 text-gray-700 border-gray-200",
} as const;

const sizeVariants = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
} as const;

interface StatusBadgeProps {
  status: keyof typeof statusVariants;
  size?: keyof typeof sizeVariants;
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "sm",
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        statusVariants[status],
        sizeVariants[size],
        className
      )}
    >
      {children}
    </span>
  );
};

/**
 * 🎨 Priority Indicator
 * Indicatore di priorità con colori e icone
 */

const priorityConfig = {
  critical: {
    color: "text-red-600",
    bg: "bg-red-100",
    icon: "🔥",
    pulse: true,
  },
  high: {
    color: "text-orange-600",
    bg: "bg-orange-100",
    icon: "⚡",
    pulse: false,
  },
  medium: {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    icon: "⚠️",
    pulse: false,
  },
  low: {
    color: "text-green-600",
    bg: "bg-green-100",
    icon: "✅",
    pulse: false,
  },
} as const;

interface PriorityIndicatorProps {
  priority: keyof typeof priorityConfig;
  showIcon?: boolean;
  className?: string;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  showIcon = true,
  className,
}) => {
  const config = priorityConfig[priority];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {showIcon && (
        <span className={cn("text-sm", config.pulse && "animate-pulse")}>
          {config.icon}
        </span>
      )}
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          config.bg,
          config.pulse && "animate-pulse"
        )}
      />
    </div>
  );
};
