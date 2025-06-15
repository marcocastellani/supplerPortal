import React from 'react';
import { Container, Grid, Text } from '@remira/unifiedui';

export interface LoadingStateProps {
  error?: string | null;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ error }) => (
  <Container type="page">
    <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
      <Grid item xs={12}>
        {error ? (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              color: '#721c24',
            }}
          >
            <Text variant="h6">Error loading form</Text>
            <Text variant="body2">{error}</Text>
          </div>
        ) : (
          <Text variant="h3">Loading...</Text>
        )}
      </Grid>
    </Grid>
  </Container>
);

export const SuccessState: React.FC = () => (
  <Container type="page">
    <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
      <Grid item xs={12}>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            color: '#155724',
          }}
        >
          Supply Network Entity created successfully!
        </div>
      </Grid>
    </Grid>
  </Container>
);
