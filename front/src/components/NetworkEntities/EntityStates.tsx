import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Text } from '@remira/unifiedui';
import { Alert, AlertTitle, CircularProgress, Box, CardContent } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { ICON_SIZES } from '../../constants/ui';

export interface LoadingStateProps {
  'data-testid'?: string;
}

export interface ErrorStateProps {
  error: string;
}

// Memoized LoadingState component [PA]
export const LoadingState: React.FC<LoadingStateProps> = React.memo(({ 'data-testid': testId }) => {
  const { t } = useTranslation();
  
  // Memoized loading text [PA]
  const loadingText = useMemo(() => 
    t('networkEntities.loading', 'Loading entities...')
  , [t]);
  
  return (
    <Card>
      <CardContent>
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          py={4}
        >
          <CircularProgress size={40} sx={{ mb: 2 }} data-testid={testId || 'loading-spinner'} />
          <Text variant="body1" color="text.secondary">
            {loadingText}
          </Text>
        </Box>
      </CardContent>
    </Card>
  );
});

LoadingState.displayName = 'LoadingState';

// Memoized ErrorState component [PA]
export const ErrorState: React.FC<ErrorStateProps> = React.memo(({ error }) => {
  const { t } = useTranslation();
  
  // Memoized error title [PA]
  const errorTitle = useMemo(() => 
    t('networkEntities.error', 'Error')
  , [t]);
  
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <AlertTitle>{errorTitle}</AlertTitle>
      {error}
    </Alert>
  );
});

ErrorState.displayName = 'ErrorState';

// Memoized NoResultsState component [PA]
export const NoResultsState: React.FC = React.memo(() => {
  const { t } = useTranslation();
  
  // Memoized texts [PA]
  const noResultsText = useMemo(() => 
    t('networkEntities.noResults', 'No entities found')
  , [t]);
  
  const noResultsHint = useMemo(() => 
    t('networkEntities.noResultsHint', 'Try adjusting your search or filter criteria')
  , [t]);
  
  // Memoized icon [PA]
  const noResultsIcon = useMemo(() => (
    <BusinessIcon
      sx={{ fontSize: ICON_SIZES.EXTRA_LARGE, color: 'text.disabled', mb: 2 }}
    />
  ), []);
  
  return (
    <Card>
      <CardContent>
        <Box textAlign="center" py={8}>
          {noResultsIcon}
          <Text variant="h6">{noResultsText}</Text>
          <Text variant="body2" color="text.secondary">
            {noResultsHint}
          </Text>
        </Box>
      </CardContent>
    </Card>
  );
});

NoResultsState.displayName = 'NoResultsState';
