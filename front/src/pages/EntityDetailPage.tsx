import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Grid, Text, Card } from "@remira/unifiedui";
import {
  Box,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactoryIcon from "@mui/icons-material/Factory";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WebIcon from "@mui/icons-material/Web";

import { SupplyNetworkEntityDto, EntityType } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";

const EntityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [entity, setEntity] = useState<SupplyNetworkEntityDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntity = async () => {
    if (!id) {
      setError(t("entityDetail.notFound"));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(id);
      setEntity(response);
    } catch (error) {
      console.error("Failed to fetch entity details:", error);
      setError(t("entityDetail.error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntity();
  }, [id]);

  const handleBackToList = () => {
    navigate("/supply-network");
  };

  const handleRefresh = () => {
    fetchEntity();
  };

  // Get entity type icon
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

  // Get entity type display name
  const getEntityTypeDisplay = (type: EntityType): string => {
    switch (type) {
      case EntityType.Supplier:
        return t("networkEntities.entityType.supplier");
      case EntityType.Site:
        return t("networkEntities.entityType.site");
      case EntityType.SubSupplier:
        return t("networkEntities.entityType.subSupplier");
      case EntityType.Person:
        return t("networkEntities.entityType.person");
      case EntityType.CompanyGroup:
        return t("networkEntities.entityType.companyGroup");
      default:
        return type;
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Container type="page">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <CircularProgress size={48} />
            <Text variant="body1" sx={{ mt: 2 }}>
              {t("entityDetail.loading")}
            </Text>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container type="page">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconButton onClick={handleBackToList} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Text variant="h4">{t("entityDetail.title")}</Text>
            </Box>
            
            <Alert 
              severity="error" 
              action={
                <button 
                  onClick={handleRefresh}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshIcon />
                  {t("entityDetail.tryAgain")}
                </button>
              }
            >
              {error}
            </Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!entity) {
    return (
      <Container type="page">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconButton onClick={handleBackToList} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Text variant="h4">{t("entityDetail.title")}</Text>
            </Box>
            
            <Alert severity="warning">
              {t("entityDetail.notFound")}
            </Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container type="page">
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleBackToList} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Box>
                <Text variant="h4">{entity.legalName || entity.shortName}</Text>
                <Box display="flex" alignItems="center" mt={1} gap={2}>
                  <Chip
                    icon={getEntityTypeIcon(entity.entityType)}
                    label={getEntityTypeDisplay(entity.entityType)}
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderRadius: "20px",
                      "& .MuiChip-icon": { marginLeft: "4px", marginRight: "8px" },
                    }}
                  />
                  <Chip
                    icon={entity.active ? <CheckCircleIcon /> : <CancelIcon />}
                    label={entity.active ? t("networkEntities.status.active") : t("networkEntities.status.inactive")}
                    color={entity.active ? "success" : "default"}
                    variant={entity.active ? "filled" : "outlined"}
                    size="medium"
                    sx={{
                      borderRadius: "20px",
                      "& .MuiChip-icon": { marginLeft: "4px", marginRight: "8px" },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            
            <button
              onClick={handleRefresh}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshIcon />
              {t("common.refresh")}
            </button>
          </Box>
        </Grid>

        {/* General Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Text variant="h6" sx={{ mb: 1 }}>
                {t("entityDetail.sections.general")}
              </Text>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.legalName")}
                  </Text>
                  <Text variant="body1">{entity.legalName || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.displayName")}
                  </Text>
                  <Text variant="body1">{entity.shortName || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.externalCode")}
                  </Text>
                  <Text variant="body1">{entity.externalCode || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.vatNumber")}
                  </Text>
                  <Text variant="body1">{entity.vatCode || "-"}</Text>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Text variant="h6" sx={{ mb: 1 }}>
                {t("entityDetail.sections.contact")}
              </Text>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon color="action" fontSize="small" />
                    <Text variant="body2" color="textSecondary">
                      {t("entityDetail.fields.email")}
                    </Text>
                  </Box>
                  <Text variant="body1">{entity.email || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon color="action" fontSize="small" />
                    <Text variant="body2" color="textSecondary">
                      {t("entityDetail.fields.phone")}
                    </Text>
                  </Box>
                  <Text variant="body1">{entity.phoneNumber || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WebIcon color="action" fontSize="small" />
                    <Text variant="body2" color="textSecondary">
                      {t("entityDetail.fields.website")}
                    </Text>
                  </Box>
                  <Text variant="body1">-</Text>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Text variant="h6" sx={{ mb: 1 }}>
                {t("entityDetail.sections.addresses")}
              </Text>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.country")}
                  </Text>
                  <Text variant="body1">{entity.country || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.city")}
                  </Text>
                  <Text variant="body1">{entity.city || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.address")}
                  </Text>
                  <Text variant="body1">{entity.address || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.postalCode")}
                  </Text>
                  <Text variant="body1">{entity.zipCode || "-"}</Text>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Metadata */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Text variant="h6" sx={{ mb: 1 }}>
                {t("entityDetail.sections.metadata")}
              </Text>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.createdAt")}
                  </Text>
                  <Text variant="body1">{formatDate(entity.created)}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.updatedAt")}
                  </Text>
                  <Text variant="body1">{formatDate(entity.lastModified)}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.createdBy")}
                  </Text>
                  <Text variant="body1">{entity.createdBy || "-"}</Text>
                </Grid>
                
                <Grid item xs={12}>
                  <Text variant="body2" color="textSecondary">
                    {t("entityDetail.fields.updatedBy")}
                  </Text>
                  <Text variant="body1">{entity.lastModifiedBy || "-"}</Text>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntityDetailPage;
