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
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactoryIcon from "@mui/icons-material/Factory";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import { SupplyNetworkEntityDto } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import {
  EntityInfoField,
  ParentEntityBreadcrumb,
  SubEntitiesList,
} from "../components/EntityDetail";
import { EntityTypeChip, EntityStatusChip, AccreditationStatusChip } from "../components/EntityChips";

const EntityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [entity, setEntity] = useState<SupplyNetworkEntityDto | null>(null);
  const [parentEntity, setParentEntity] =
    useState<SupplyNetworkEntityDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const fetchEntity = async () => {
    if (!id) {
      setError(t("entityDetail.notFound"));
      setIsLoading(false);
      return;
    }

    console.log("Fetching entity with ID:", id);
    setIsLoading(true);
    setError(null);

    try {
      const response =
        await SupplyNetworkEntitiesService.getSupplyNetworkEntity(id);
      console.log("Entity fetched successfully:", response);
      setEntity(response);

      // Fetch parent entity if exists
      if (response.parentId) {
        try {
          const parentResponse =
            await SupplyNetworkEntitiesService.getSupplyNetworkEntity(
              response.parentId
            );
          setParentEntity(parentResponse);
        } catch (parentError) {
          console.warn("Failed to fetch parent entity:", parentError);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch entity details:", error);
      console.error("Error details:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message,
      });

      // More specific error messages
      if (error?.response?.status === 404) {
        setError(t("entityDetail.notFound"));
      } else if (error?.response?.status === 403) {
        setError(t("forbidden"));
      } else if (error?.response?.status >= 500) {
        setError(t("serverError"));
      } else {
        setError(t("entityDetail.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldUpdate = async (
    fieldName: string,
    fieldValue: string | boolean | null
  ) => {
    if (!entity) return;

    try {
      const updatedEntity =
        await SupplyNetworkEntitiesService.updateEntityField(
          entity.id,
          fieldName,
          fieldValue
        );
      setEntity(updatedEntity);
    } catch (error) {
      console.error("Failed to update field:", error);
      throw error;
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Container type="page">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
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
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
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

            <Alert severity="warning">{t("entityDetail.notFound")}</Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container type="page">
      <Grid container spacing={2}>
        {/* Header with Breadcrumb */}
        <Grid item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <IconButton onClick={handleBackToList} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <ParentEntityBreadcrumb
                currentEntity={entity}
                parentEntity={parentEntity || undefined}
              />
            </Box>
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Hero Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, mb: 1 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box>
                  <Text variant="h4" sx={{ mb: 1 }}>
                    {entity.legalName || entity.shortName}
                  </Text>
                  {entity.shortName &&
                    entity.shortName !== entity.legalName && (
                      <Text variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                        {entity.shortName}
                      </Text>
                    )}
                  <Box display="flex" alignItems="center" gap={2}>
                    <EntityTypeChip entityType={entity.entityType} />
                    <EntityStatusChip active={entity.active} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Tabs Navigation */}
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                icon={<InfoIcon />}
                label={t("entityDetail.tabs.overview")}
                iconPosition="start"
              />
              <Tab
                icon={<ContactsIcon />}
                label={t("entityDetail.tabs.contacts")}
                iconPosition="start"
              />
              <Tab
                icon={<BusinessCenterIcon />}
                label={t("entityDetail.tabs.business")}
                iconPosition="start"
              />
              <Tab
                icon={<AccountTreeOutlinedIcon />}
                label={t("entityDetail.tabs.subEntities")}
                iconPosition="start"
              />
              <Tab
                icon={<SettingsIcon />}
                label={t("entityDetail.tabs.system")}
                iconPosition="start"
              />
            </Tabs>
          </Paper>
        </Grid>

        {/* Tab Content */}
        <Grid item xs={12}>
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {/* Overview - Essential Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.general")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.legalName")}
                      value={entity.legalName}
                      fieldName="legalName"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.displayName")}
                      value={entity.shortName}
                      fieldName="shortName"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.externalCode")}
                      value={entity.externalCode}
                      fieldName="externalCode"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.vatNumber")}
                      value={entity.vatCode}
                      fieldName="vatCode"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.active")}
                      value={entity.active}
                      fieldName="active"
                      type="boolean"
                      onUpdate={handleFieldUpdate}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Stats */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.quickStats")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <Box display="flex" flexDirection="column" gap={2}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text variant="body2" color="textSecondary">
                          {t("entityDetail.fields.entityType")}
                        </Text>
                        <EntityTypeChip entityType={entity.entityType} />
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text variant="body2" color="textSecondary">
                          {t("entityDetail.fields.accreditationStatus")}
                        </Text>
                        <AccreditationStatusChip
                          accreditationStatus={entity.accreditationStatus}
                        />
                      </Box>

                      {entity.country && (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text variant="body2" color="textSecondary">
                            {t("entityDetail.fields.location")}
                          </Text>
                          <Text variant="body2">
                            {[entity.city, entity.country]
                              .filter(Boolean)
                              .join(", ")}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.contact")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.email")}
                      value={entity.email}
                      fieldName="email"
                      type="email"
                      icon={<EmailIcon fontSize="small" />}
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.phone")}
                      value={entity.phoneNumber}
                      fieldName="phoneNumber"
                      icon={<PhoneIcon fontSize="small" />}
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.contactPerson")}
                      value={entity.contactPersonName}
                      fieldName="contactPersonName"
                      icon={<PersonIcon fontSize="small" />}
                      onUpdate={handleFieldUpdate}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Address Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.addresses")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.country")}
                      value={entity.country}
                      fieldName="country"
                      icon={<LocationOnIcon fontSize="small" />}
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.region")}
                      value={entity.region}
                      fieldName="region"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.city")}
                      value={entity.city}
                      fieldName="city"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.address")}
                      value={entity.address}
                      fieldName="address"
                      type="textarea"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.postalCode")}
                      value={entity.zipCode}
                      fieldName="zipCode"
                      onUpdate={handleFieldUpdate}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={2}>
              {/* Business Details */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.business")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.taxCode")}
                      value={entity.taxCode}
                      fieldName="taxCode"
                      onUpdate={handleFieldUpdate}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.roleInSupplyChain")}
                      value={entity.roleInSupplyChain}
                      fieldName="roleInSupplyChain"
                      editable={false}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.accreditationStatus")}
                      value={entity.accreditationStatus}
                      fieldName="accreditationStatus"
                      editable={false}
                    />

                    {entity.accreditationDate && (
                      <EntityInfoField
                        label={t("entityDetail.fields.accreditationDate")}
                        value={formatDate(entity.accreditationDate)}
                        fieldName="accreditationDate"
                        editable={false}
                      />
                    )}

                    {entity.deactivationDate && (
                      <EntityInfoField
                        label={t("entityDetail.fields.deactivationDate")}
                        value={formatDate(entity.deactivationDate)}
                        fieldName="deactivationDate"
                        editable={false}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Tags */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.tags")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    {entity.tags && entity.tags.length > 0 ? (
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {entity.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Text variant="body2" color="textSecondary">
                        {t("entityDetail.noTags")}
                      </Text>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Box>
              <SubEntitiesList
                parentEntityId={entity.id}
                onAddNew={() =>
                  navigate(`/supply-network/create?parentId=${entity.id}`)
                }
              />
            </Box>
          )}

          {activeTab === 4 && (
            <Grid container spacing={2}>
              {/* System Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.metadata")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.createdAt")}
                      value={formatDate(entity.created)}
                      fieldName="created"
                      editable={false}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.updatedAt")}
                      value={formatDate(entity.lastModified)}
                      fieldName="lastModified"
                      editable={false}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.createdBy")}
                      value={entity.createdBy}
                      fieldName="createdBy"
                      editable={false}
                    />

                    <EntityInfoField
                      label={t("entityDetail.fields.updatedBy")}
                      value={entity.lastModifiedBy}
                      fieldName="lastModifiedBy"
                      editable={false}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* System Identifiers */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Text variant="h6" sx={{ mb: 1 }}>
                      {t("entityDetail.sections.identifiers")}
                    </Text>
                    <Divider sx={{ mb: 1 }} />

                    <EntityInfoField
                      label={t("entityDetail.fields.id")}
                      value={entity.id}
                      fieldName="id"
                      editable={false}
                    />

                    {entity.parentId && (
                      <EntityInfoField
                        label={t("entityDetail.fields.parentId")}
                        value={entity.parentId}
                        fieldName="parentId"
                        editable={false}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntityDetailPage;
