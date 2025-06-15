import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Fab
} from '@mui/material';
import { Text } from '@remira/unifiedui';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { SupplyNetworkEntityDto, EntityType } from '../../types/supplyNetworkEntities';
import { SupplyNetworkEntitiesService } from '../../services/supplyNetworkEntitiesService';

interface SubEntitiesListProps {
  parentEntityId: string;
  onAddNew?: () => void;
}

export const SubEntitiesList: React.FC<SubEntitiesListProps> = ({
  parentEntityId,
  onAddNew
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [subEntities, setSubEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubEntities();
  }, [parentEntityId]);

  const loadSubEntities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const entities = await SupplyNetworkEntitiesService.getEntityChildren(parentEntityId);
      setSubEntities(entities);
    } catch (error) {
      console.error('Failed to load sub-entities:', error);
      setError(t('entityDetail.subEntities.loadError'));
    } finally {
      setIsLoading(false);
    }
  };

  const getEntityTypeIcon = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return <BusinessIcon />;
      case EntityType.Site:
        return <LocationOnIcon />;
      case EntityType.SubSupplier:
        return <FactoryIcon />;
      case EntityType.Person:
        return <PersonIcon />;
      case EntityType.CompanyGroup:
        return <ApartmentIcon />;
      default:
        return <AccountTreeIcon />;
    }
  };

  const getEntityTypeDisplay = (type: EntityType): string => {
    switch (type) {
      case EntityType.Supplier:
        return t('networkEntities.entityType.supplier');
      case EntityType.Site:
        return t('networkEntities.entityType.site');
      case EntityType.SubSupplier:
        return t('networkEntities.entityType.subSupplier');
      case EntityType.Person:
        return t('networkEntities.entityType.person');
      case EntityType.CompanyGroup:
        return t('networkEntities.entityType.companyGroup');
      default:
        return type;
    }
  };

  const handleViewEntity = (entityId: string) => {
    navigate(`/supply-network/${entityId}`);
  };

  const handleEditEntity = (entityId: string) => {
    navigate(`/supply-network/${entityId}/edit`);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" action={
        <IconButton size="small" onClick={loadSubEntities}>
          <AddIcon />
        </IconButton>
      }>
        {error}
      </Alert>
    );
  }

  return (
    <Box position="relative">
      {subEntities.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Text variant="body1" color="textSecondary">
            {t('entityDetail.subEntities.empty')}
          </Text>
          <Text variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {t('entityDetail.subEntities.emptyDescription')}
          </Text>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {subEntities.map((entity) => (
            <Grid item xs={12} sm={6} md={4} key={entity.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Header */}
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {getEntityTypeIcon(entity.entityType)}
                      <Chip
                        label={getEntityTypeDisplay(entity.entityType)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    
                    <Chip
                      icon={entity.active ? <CheckCircleIcon /> : <CancelIcon />}
                      label={entity.active ? t('networkEntities.status.active') : t('networkEntities.status.inactive')}
                      color={entity.active ? 'success' : 'default'}
                      size="small"
                      variant={entity.active ? 'filled' : 'outlined'}
                    />
                  </Box>

                  {/* Entity Info */}
                  <Box mb={2}>
                    <Text variant="subtitle2" sx={{ mb: 0.5 }}>
                      {entity.legalName}
                    </Text>
                    {entity.shortName && entity.shortName !== entity.legalName && (
                      <Text variant="body2" color="textSecondary">
                        {entity.shortName}
                      </Text>
                    )}
                    {entity.externalCode && (
                      <Text variant="body2" color="textSecondary">
                        Code: {entity.externalCode}
                      </Text>
                    )}
                  </Box>

                  {/* Location */}
                  {(entity.city || entity.country) && (
                    <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Text variant="body2" color="textSecondary">
                        {[entity.city, entity.country].filter(Boolean).join(', ')}
                      </Text>
                    </Box>
                  )}

                  {/* Actions */}
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleViewEntity(entity.id)}
                      title={t('common.view')}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditEntity(entity.id)}
                      title={t('common.edit')}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add New FAB */}
      {onAddNew && (
        <Fab
          color="primary"
          aria-label="add sub-entity"
          onClick={onAddNew}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};
