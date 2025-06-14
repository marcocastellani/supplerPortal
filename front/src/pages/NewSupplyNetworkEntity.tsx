import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Text, 
  Input, 
  Select
} from '@remira/unifiedui';
import { FormWizard, WizardStep } from '../components/SupplyNetworkEntities/FormWizard';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { 
  EntityType, 
  RoleInSupplyChain, 
  AccreditationStatus,
  SupplyNetworkEntityFormData,
  EnumValues,
  SupplyNetworkEntityDto
} from '../types/supplyNetworkEntities';

export const NewSupplyNetworkEntity = () => {
  const [formData, setFormData] = useState<SupplyNetworkEntityFormData>({
    entityType: EntityType.Supplier,
    roleInSupplyChain: RoleInSupplyChain.Manufacturer,
    isSubEntity: false,
    legalName: '',
    shortName: '',
    externalCode: '',
    country: '',
    region: '',
    city: '',
    address: '',
    zipCode: '',
    email: '',
    phoneNumber: '',
    accreditationStatus: AccreditationStatus.Approved,
    tags: [],
    contactPersonName: '',
    vatCode: '',
    taxCode: '',
    active: true
  });

  const [enumValues, setEnumValues] = useState<EnumValues | null>(null);
  const [potentialParents, setPotentialParents] = useState<SupplyNetworkEntityDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Step validation functions
  const validateStep1 = () => {
    return !!(formData.entityType && formData.roleInSupplyChain && 
      (!formData.isSubEntity || formData.parentId));
  };

  const validateStep2 = () => {
    return !!(formData.legalName && formData.country);
  };

  const validateStep3 = () => {
    return !!(formData.accreditationStatus);
  };

  useEffect(() => {
    const loadEnumValues = async () => {
      try {
        const enums = await SupplyNetworkEntitiesService.getEnumValues();
        setEnumValues(enums);
      } catch (err) {
        setError('Failed to load form data');
      }
    };

    const loadPotentialParents = async () => {
      try {
        const parents = await SupplyNetworkEntitiesService.getPotentialParents();
        setPotentialParents(parents);
      } catch (error) {
        console.warn('Failed to load potential parents:', error);
      }
    };

    loadEnumValues();
    loadPotentialParents();
  }, []);

  const handleInputChange = (field: keyof SupplyNetworkEntityFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null); // Clear errors when user starts typing
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await SupplyNetworkEntitiesService.createSupplyNetworkEntity({
        externalCode: formData.externalCode,
        entityType: formData.entityType,
        parentId: formData.isSubEntity ? formData.parentId : undefined,
        legalName: formData.legalName,
        shortName: formData.shortName,
        vatCode: formData.vatCode,
        taxCode: formData.taxCode,
        country: formData.country,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        zipCode: formData.zipCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        contactPersonName: formData.contactPersonName,
        roleInSupplyChain: formData.roleInSupplyChain,
        tags: formData.tags,
        active: formData.active,
        accreditationStatus: formData.accreditationStatus,
        accreditationDate: formData.accreditationDate
      });

      setSuccess(true);
      // Reset form after successful creation
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          entityType: EntityType.Supplier,
          roleInSupplyChain: RoleInSupplyChain.Manufacturer,
          isSubEntity: false,
          legalName: '',
          shortName: '',
          externalCode: '',
          country: '',
          region: '',
          city: '',
          address: '',
          zipCode: '',
          email: '',
          phoneNumber: '',
          accreditationStatus: AccreditationStatus.Approved,
          tags: [],
          contactPersonName: '',
          vatCode: '',
          taxCode: '',
          active: true
        });
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create entity');
    } finally {
      setIsLoading(false);
    }
  };

  if (!enumValues) {
    return (
      <Container type="page">
        <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
          <Grid item xs={12}>
            <Text variant="h3">Loading...</Text>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (success) {
    return (
      <Container type="page">
        <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
          <Grid item xs={12}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#d4edda', 
              border: '1px solid #c3e6cb', 
              borderRadius: '8px',
              color: '#155724'
            }}>
              Supply Network Entity created successfully!
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <FormWizard onComplete={handleSubmit} isLoading={isLoading}>
      {/* Step 1: Entity Type & Role */}
      <WizardStep title="Entity Type & Role" isValid={validateStep1()}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>Entity Configuration</Text>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Select
              label="Entity Type"
              value={formData.entityType}
              onChange={(event, option: any) => handleInputChange('entityType', option?.value as EntityType)}
              options={enumValues.entityTypes.map(et => ({ 
                value: et.value, 
                label: et.display 
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Role in Supply Chain"
              value={formData.roleInSupplyChain}
              onChange={(event, option: any) => handleInputChange('roleInSupplyChain', option?.value as RoleInSupplyChain)}
              options={enumValues.rolesInSupplyChain.map(role => ({ 
                value: role.value, 
                label: role.display 
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isSubEntity}
                onChange={(e) => handleInputChange('isSubEntity', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <Text variant="body1">This is a sub-entity (linked to a parent)</Text>
            </label>
          </Grid>

          {formData.isSubEntity && (
            <Grid item xs={12}>
              <Select
                label="Parent Entity"
                value={formData.parentId || ''}
                onChange={(event, option: any) => handleInputChange('parentId', option?.value)}
                options={potentialParents.map(parent => ({ 
                  value: parent.id, 
                  label: parent.legalName 
                }))}
                fullWidth
              />
            </Grid>
          )}
        </Grid>
      </WizardStep>

      {/* Step 2: General Information */}
      <WizardStep title="General Information" isValid={validateStep2()}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>Basic Information</Text>
          </Grid>

          <Grid item xs={12} md={8}>
            <Input
              label="Legal Name"
              value={formData.legalName}
              onChange={(value: string) => handleInputChange('legalName', value)}
              fullWidth
              helperText="Official registered name"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Input
              label="Short Name"
              value={formData.shortName}
              onChange={(value: string) => handleInputChange('shortName', value)}
              fullWidth
              helperText="Display name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="External Code"
              value={formData.externalCode}
              onChange={(value: string) => handleInputChange('externalCode', value)}
              fullWidth
              helperText="ERP, PLM reference code"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Email"
              value={formData.email}
              onChange={(value: string) => handleInputChange('email', value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2, mt: 2 }}>Address Information</Text>
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Country"
              value={formData.country}
              onChange={(value: string) => handleInputChange('country', value)}
              fullWidth
              helperText="ISO code"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Region"
              value={formData.region}
              onChange={(value: string) => handleInputChange('region', value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="City"
              value={formData.city}
              onChange={(value: string) => handleInputChange('city', value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(value: string) => handleInputChange('zipCode', value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Address"
              value={formData.address}
              onChange={(value: string) => handleInputChange('address', value)}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(value: string) => handleInputChange('phoneNumber', value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </WizardStep>

      {/* Step 3: Status & Contact */}
      <WizardStep title="Status & Contact" isValid={validateStep3()}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>Status Information</Text>
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Accreditation Status"
              value={formData.accreditationStatus}
              onChange={(event, option: any) => handleInputChange('accreditationStatus', option?.value as AccreditationStatus)}
              options={enumValues.accreditationStatuses.map(status => ({ 
                value: status.value, 
                label: status.display 
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Tags"
              value={formData.tags.join(', ')}
              onChange={(value: string) => handleInputChange('tags', value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag))}
              fullWidth
              helperText="Comma-separated tags (e.g., leather, Asia, highRisk)"
            />
          </Grid>

          {(formData.entityType === EntityType.Person || formData.roleInSupplyChain === RoleInSupplyChain.ContactPerson) && (
            <Grid item xs={12}>
              <Input
                label="Contact Person Name"
                value={formData.contactPersonName}
                onChange={(value: string) => handleInputChange('contactPersonName', value)}
                fullWidth
              />
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f8d7da', 
                border: '1px solid #f5c6cb', 
                borderRadius: '8px',
                color: '#721c24'
              }}>
                {error}
              </div>
            </Grid>
          )}
        </Grid>
      </WizardStep>

      {/* Step 4: Review & Submit */}
      <WizardStep title="Review & Submit" isValid={true}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>Review Information</Text>
            <Text variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Please review all the information before submitting.
            </Text>
          </Grid>

          <Grid item xs={12}>
            <div style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px', 
              padding: '16px',
              backgroundColor: '#fafafa'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Entity Type:</Text>
                  <Text variant="body2">{formData.entityType}</Text>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Role:</Text>
                  <Text variant="body2">{formData.roleInSupplyChain}</Text>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle2">Legal Name:</Text>
                  <Text variant="body2">{formData.legalName}</Text>
                </Grid>
                {formData.shortName && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Short Name:</Text>
                    <Text variant="body2">{formData.shortName}</Text>
                  </Grid>
                )}
                {formData.externalCode && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">External Code:</Text>
                    <Text variant="body2">{formData.externalCode}</Text>
                  </Grid>
                )}
                {formData.email && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Email:</Text>
                    <Text variant="body2">{formData.email}</Text>
                  </Grid>
                )}
                {formData.phoneNumber && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Phone:</Text>
                    <Text variant="body2">{formData.phoneNumber}</Text>
                  </Grid>
                )}
                {(formData.country || formData.city) && (
                  <Grid item xs={12}>
                    <Text variant="subtitle2">Location:</Text>
                    <Text variant="body2">
                      {[formData.city, formData.region, formData.country].filter(Boolean).join(', ')}
                    </Text>
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Accreditation Status:</Text>
                  <Text variant="body2">{formData.accreditationStatus}</Text>
                </Grid>
                {formData.tags.length > 0 && (
                  <Grid item xs={12}>
                    <Text variant="subtitle2">Tags:</Text>
                    <Text variant="body2">{formData.tags.join(', ')}</Text>
                  </Grid>
                )}
              </Grid>
            </div>
          </Grid>

          {isLoading && (
            <Grid item xs={12}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#d1ecf1', 
                border: '1px solid #bee5eb', 
                borderRadius: '8px',
                color: '#0c5460'
              }}>
                Creating entity...
              </div>
            </Grid>
          )}
        </Grid>
      </WizardStep>
    </FormWizard>
  );
};
