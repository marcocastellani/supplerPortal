import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorization } from '@/hooks/useAuthorization';
import { Box, CircularProgress } from '@remira/unifiedui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  menuItemId?: string;
  requiredRole?: string;
  fallbackPath?: string;
}

/**
 * Component that protects routes based on user permissions
 * [AC] [SFT]
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  menuItemId,
  requiredRole,
  fallbackPath = '/dashboard'
}) => {
  const { canViewMenuItem, hasRole, loading } = useAuthorization();

  // Show loading state while checking permissions
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // Check menu item permission if specified
  if (menuItemId && !canViewMenuItem(menuItemId)) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check role permission if specified
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  // User has permission, render the protected content
  return <>{children}</>;
};