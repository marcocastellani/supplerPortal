import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Breadcrumbs, 
  Link, 
  Chip, 
  Card, 
  CardContent, 
  Fade, 
  Popper,
  ClickAwayListener
} from '@mui/material';
import { Text } from '@remira/unifiedui';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { SupplyNetworkEntityDto, EntityType } from '../../types/supplyNetworkEntities';

interface ParentEntityBreadcrumbProps {
  currentEntity: SupplyNetworkEntityDto;
  parentEntity?: SupplyNetworkEntityDto;
  onParentClick?: (parentId: string) => void;
}

export const ParentEntityBreadcrumb: React.FC<ParentEntityBreadcrumbProps> = ({
  currentEntity,
  parentEntity,
  onParentClick
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const getEntityTypeIcon = (type: EntityType, size: 'small' | 'medium' = 'small') => {
    const iconProps = { fontSize: size };
    switch (type) {
      case EntityType.Supplier:
        return <BusinessIcon {...iconProps} />;
      case EntityType.Site:
        return <LocationOnIcon {...iconProps} />;
      case EntityType.SubSupplier:
        return <FactoryIcon {...iconProps} />;
      case EntityType.Person:
        return <PersonIcon {...iconProps} />;
      case EntityType.CompanyGroup:
        return <ApartmentIcon {...iconProps} />;
      default:
        return <AccountTreeIcon {...iconProps} />;
    }
  };

  const handleParentHover = (event: React.MouseEvent<HTMLElement>) => {
    if (parentEntity) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const handleParentLeave = () => {
    setOpen(false);
  };

  const handleParentClick = () => {
    if (parentEntity && onParentClick) {
      onParentClick(parentEntity.id);
    } else if (parentEntity) {
      navigate(`/supply-network/${parentEntity.id}`);
    }
  };

  const handleHomeClick = () => {
    navigate('/supply-network');
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<ChevronRightIcon fontSize="small" />}
        aria-label="entity breadcrumb"
      >
        {/* Home */}
        <Link
          color="inherit"
          onClick={handleHomeClick}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Supply Network
        </Link>

        {/* Parent Entity */}
        {parentEntity && (
          <ClickAwayListener onClickAway={handleParentLeave}>
            <Box position="relative">
              <Link
                color="inherit"
                onClick={handleParentClick}
                onMouseEnter={handleParentHover}
                onMouseLeave={handleParentLeave}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {getEntityTypeIcon(parentEntity.entityType)}
                <Text variant="body2" sx={{ ml: 0.5 }}>
                  {parentEntity.shortName || parentEntity.legalName}
                </Text>
              </Link>

              {/* Parent Preview Popup */}
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                transition
                sx={{ zIndex: 1300 }}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={200}>
                    <Card sx={{ maxWidth: 300, mt: 1 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          {getEntityTypeIcon(parentEntity.entityType, 'medium')}
                          <Text variant="subtitle2">
                            {parentEntity.legalName}
                          </Text>
                        </Box>
                        
                        <Box mb={1}>
                          <Chip
                            label={parentEntity.entityType}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        
                        {parentEntity.city && parentEntity.country && (
                          <Text variant="body2" color="textSecondary">
                            📍 {parentEntity.city}, {parentEntity.country}
                          </Text>
                        )}
                        
                        {parentEntity.email && (
                          <Text variant="body2" color="textSecondary" sx={{ display: 'block' }}>
                            ✉️ {parentEntity.email}
                          </Text>
                        )}
                      </CardContent>
                    </Card>
                  </Fade>
                )}
              </Popper>
            </Box>
          </ClickAwayListener>
        )}

        {/* Current Entity */}
        <Box display="flex" alignItems="center">
          {getEntityTypeIcon(currentEntity.entityType)}
          <Text variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>
            {currentEntity.shortName || currentEntity.legalName}
          </Text>
        </Box>
      </Breadcrumbs>
    </Box>
  );
};
