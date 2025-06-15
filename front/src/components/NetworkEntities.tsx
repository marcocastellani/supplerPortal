import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { EntityType, SupplyNetworkEntityDto } from '../types/supplyNetworkEntities';
import { Link } from 'react-router-dom';
import { Container, Grid, Text, Select, Card } from "@remira/unifiedui";
import { 
  TextField, 
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Box,
  Pagination,
  CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const NetworkEntities: React.FC = () => {
  const { t } = useTranslation();
  const [entities, setEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<EntityType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  // Fetch entities function
  const fetchEntities = useCallback(async (search: string, type: EntityType | 'all', page: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
        searchTerm: search || undefined,
        entityType: type !== 'all' ? type : undefined,
        page: page,
        pageSize: pageSize,
        sortBy: 'legalName',
        sortDescending: false
      });
      
      setEntities(response.items || []);
      setTotalPages(response.totalPages || 1);
      setTotalCount(response.totalCount || 0);
    } catch (error) {
      console.error('Failed to fetch entities:', error);
      setError(t('networkEntities.errorFetching'));
      setEntities([]);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce((search: string, type: EntityType | 'all', page: number) => {
      fetchEntities(search, type, page);
    }, 500),
    [fetchEntities]
  );

  // Effect to fetch data on mount and when filters change
  useEffect(() => {
    debouncedFetch(searchQuery, filterType, currentPage);
    
    // Cleanup
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, filterType, currentPage, debouncedFetch]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter type change
  const handleFilterTypeChange = (event: any, option: any) => {
    const newValue = option?.value || event?.target?.value || 'all';
    setFilterType(newValue as EntityType | 'all');
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get entity type display name
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

  // Get entity type icon
  const getEntityTypeIcon = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return <BusinessIcon fontSize="small" />;
      case EntityType.Site:
        return <FactoryIcon fontSize="small" />;
      case EntityType.SubSupplier:
        return <AccountTreeIcon fontSize="small" />;
      case EntityType.Person:
        return <PersonIcon fontSize="small" />;
      case EntityType.CompanyGroup:
        return <ApartmentIcon fontSize="small" />;
      default:
        return <BusinessIcon fontSize="small" />;
    }
  };

  // Get entity type color scheme
  const getEntityTypeColor = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return { 
          color: '#1976d2', 
          backgroundColor: '#e3f2fd',
          borderColor: '#1976d2'
        };
      case EntityType.Site:
        return { 
          color: '#f57c00', 
          backgroundColor: '#fff3e0',
          borderColor: '#f57c00'
        };
      case EntityType.SubSupplier:
        return { 
          color: '#7b1fa2', 
          backgroundColor: '#f3e5f5',
          borderColor: '#7b1fa2'
        };
      case EntityType.Person:
        return { 
          color: '#388e3c', 
          backgroundColor: '#e8f5e8',
          borderColor: '#388e3c'
        };
      case EntityType.CompanyGroup:
        return { 
          color: '#d32f2f', 
          backgroundColor: '#ffebee',
          borderColor: '#d32f2f'
        };
      default:
        return { 
          color: '#757575', 
          backgroundColor: '#f5f5f5',
          borderColor: '#757575'
        };
    }
  };

  return (
    <Container type="page">
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <BusinessIcon color="primary" sx={{ fontSize: 32 }} />
            <Text variant="h4">
              {t('networkEntities.title')}
            </Text>
          </Box>
        </Grid>

        {/* Search and Filter Controls */}
        <Grid item xs={12}>
          <Card title="Search & Filter">
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder={t('networkEntities.searchPlaceholder')}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select
                    value={filterType}
                    onChange={handleFilterTypeChange}
                    options={[
                      { value: 'all', label: t('networkEntities.filterAll') },
                      { value: EntityType.Supplier, label: t('networkEntities.filterSupplier') },
                      { value: EntityType.Site, label: t('networkEntities.filterSite') },
                      { value: EntityType.SubSupplier, label: t('networkEntities.filterSubSupplier') },
                      { value: EntityType.Person, label: t('networkEntities.filterPerson') },
                      { value: EntityType.CompanyGroup, label: t('networkEntities.filterCompanyGroup') }
                    ]}
                    fullWidth
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              {/* Results count */}
              {!isLoading && !error && (
                <Box mt={2}>
                  <Text variant="body2">
                    {t('networkEntities.resultsCount', { count: totalCount })}
                  </Text>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12}>
          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" py={8}>
                  <CircularProgress data-testid="loading-spinner" />
                  <Box ml={2}>
                    <Text variant="body1">{t('networkEntities.loading', 'Loading...')}</Text>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}

          {/* No Results State */}
          {!isLoading && !error && entities.length === 0 && (
            <Card>
              <CardContent>
                <Box textAlign="center" py={8}>
                  <BusinessIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Text variant="h6">
                    {t('networkEntities.noResults')}
                  </Text>
                  <Text variant="body2">
                    {t('networkEntities.noResultsDescription', 'Try adjusting your search criteria')}
                  </Text>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Results Table */}
          {!isLoading && !error && entities.length > 0 && (
            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ '& .MuiTableCell-root': { padding: '16px' } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>{t('networkEntities.table.name')}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t('networkEntities.table.vat')}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t('networkEntities.table.code')}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t('networkEntities.table.location')}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t('networkEntities.table.type')}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t('networkEntities.table.status')}</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entities.map((entity) => (
                      <TableRow 
                        key={entity.id} 
                        hover
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'action.hover',
                            cursor: 'pointer'
                          } 
                        }}
                      >
                        <TableCell>
                          <Box>
                            <Link 
                              to={`/supply-network/entity/${entity.id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Text 
                                variant="body1" 
                                color="primary"
                                sx={{ 
                                  fontWeight: 'medium',
                                  '&:hover': { textDecoration: 'underline' } 
                                }}
                              >
                                {entity.legalName}
                              </Text>
                            </Link>
                            {entity.shortName && entity.shortName !== entity.legalName && (
                              <Text variant="body2" color="textSecondary">
                                {entity.shortName}
                              </Text>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Text variant="body2" color="textSecondary">
                            {entity.vatCode || '-'}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text variant="body2" color="textSecondary">
                            {entity.externalCode || '-'}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Text variant="body2">
                              {entity.city}, {entity.country}
                            </Text>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={getEntityTypeIcon(entity.entityType)}
                            label={getEntityTypeDisplay(entity.entityType)}
                            size="small"
                            sx={{
                              ...getEntityTypeColor(entity.entityType),
                              fontWeight: 'medium',
                              borderRadius: '20px',
                              height: '36px',
                              padding: '0 12px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              border: `1px solid ${getEntityTypeColor(entity.entityType).borderColor}`,
                              '& .MuiChip-icon': {
                                color: getEntityTypeColor(entity.entityType).color,
                                marginLeft: '4px',
                                marginRight: '8px'
                              },
                              '& .MuiChip-label': {
                                paddingLeft: '0px',
                                paddingRight: '8px',
                                fontSize: '0.875rem'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={entity.active ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                            label={entity.active ? t('networkEntities.status.active') : t('networkEntities.status.inactive')}
                            size="small"
                            sx={{
                              fontWeight: 'medium',
                              borderRadius: '20px',
                              height: '36px',
                              padding: '0 12px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              '& .MuiChip-label': {
                                paddingLeft: '0px',
                                paddingRight: '8px',
                                fontSize: '0.875rem'
                              },
                              ...(entity.active ? {
                                color: '#2e7d32',
                                backgroundColor: '#e8f5e8',
                                border: '1px solid #4caf50',
                                '& .MuiChip-icon': { 
                                  color: '#2e7d32',
                                  marginLeft: '4px',
                                  marginRight: '8px'
                                }
                              } : {
                                color: '#d32f2f',
                                backgroundColor: '#ffebee',
                                border: '1px solid #f44336',
                                '& .MuiChip-icon': { 
                                  color: '#d32f2f',
                                  marginLeft: '4px',
                                  marginRight: '8px'
                                }
                              })
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                    <Text variant="body2" color="textSecondary">
                      {t('networkEntities.pagination.showing', {
                        from: (currentPage - 1) * pageSize + 1,
                        to: Math.min(currentPage * pageSize, totalCount),
                        total: totalCount
                      })}
                    </Text>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, page) => handlePageChange(page)}
                      color="primary"
                      showFirstButton
                      showLastButton
                      disabled={isLoading}
                    />
                  </Box>
                </CardContent>
              )}
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NetworkEntities;
