import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SupplyNetworkEntityDto } from '../types/supplyNetworkEntities';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';

const EntityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get entity ID from URL
  const { t } = useTranslation();
  const [entity, setEntity] = React.useState<SupplyNetworkEntityDto | null>(null); // State to hold entity data

  React.useEffect(() => {
    if (id) {
      const fetchEntity = async () => {
        try {
          const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(id);
          setEntity(response); // Set entity data from API response
        } catch (error) {
          console.error('Failed to fetch entity details:', error);
        }
      };
      fetchEntity();
    }
  }, [id]);

  if (!entity) {
    return <div>{t('loading')}</div>; // Loading state
  }

  return (
    <div>
      <h2>{entity.legalName} ({entity.entityType})</h2>
      {/* Removed description field as it does not exist in SupplyNetworkEntityDto */}
      <p>{t('entityDetails.otherInfo')} Other entity details here.</p> // Placeholder for actual fields
      {/* Add more fields and navigation to related entities */}
    </div>
  );
};

export default EntityDetailPage;
