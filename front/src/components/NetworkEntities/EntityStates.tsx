import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Text } from '@remira/unifiedui';
import { Alert, CircularProgress, Box, CardContent } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

export interface LoadingStateProps {
  'data-testid'?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 'data-testid': testId }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={8}
        >
          <CircularProgress data-testid={testId || 'loading-spinner'} />
          <Box ml={2}>
            <Text variant="body1">
              {t('networkEntities.loading', 'Loading...')}
            </Text>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export interface ErrorStateProps {
  error: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <Alert severity="error" variant="filled">
    {error}
  </Alert>
);

export const NoResultsState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box textAlign="center" py={8}>
          <BusinessIcon
            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
          />
          <Text variant="h6">{t('networkEntities.noResults')}</Text>
          <Text variant="body2">
            {t(
              'networkEntities.noResultsDescription',
              'Try adjusting your search criteria'
            )}
          </Text>
        </Box>
      </CardContent>
    </Card>
  );
};
