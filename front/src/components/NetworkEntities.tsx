import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { EntityType, SupplyNetworkEntityDto } from '../types/supplyNetworkEntities';
import { Link } from 'react-router-dom';

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
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as EntityType | 'all');
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

  return (
    <div className="network-entities-container p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{t('networkEntities.title')}</h2>
        
        {/* Search and Filter Controls */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('networkEntities.searchPlaceholder')} 
              value={searchQuery} 
              onChange={handleSearchChange}
              disabled={isLoading}
            />
          </div>
          <div className="w-64">
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType} 
              onChange={handleFilterChange}
              disabled={isLoading}
            >
              <option value="all">{t('networkEntities.filterAll')}</option>
              <option value={EntityType.Supplier}>{t('networkEntities.filterSupplier')}</option>
              <option value={EntityType.Site}>{t('networkEntities.filterSite')}</option>
              <option value={EntityType.SubSupplier}>{t('networkEntities.filterSubSupplier')}</option>
              <option value={EntityType.Person}>{t('networkEntities.filterPerson')}</option>
              <option value={EntityType.CompanyGroup}>{t('networkEntities.filterCompanyGroup')}</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {!isLoading && !error && (
          <div className="text-sm text-gray-600 mb-4">
            {t('networkEntities.resultsCount', { count: totalCount })}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div data-testid="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && entities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('networkEntities.noResults')}
        </div>
      )}

      {/* Results List */}
      {!isLoading && !error && entities.length > 0 && (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('networkEntities.table.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('networkEntities.table.code')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('networkEntities.table.type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('networkEntities.table.location')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('networkEntities.table.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entities.map((entity) => (
                  <tr key={entity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/supply-network/entity/${entity.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {entity.legalName}
                      </Link>
                      {entity.shortName && entity.shortName !== entity.legalName && (
                        <div className="text-sm text-gray-500">{entity.shortName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entity.externalCode || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getEntityTypeDisplay(entity.entityType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entity.city}, {entity.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entity.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {entity.active ? t('networkEntities.status.active') : t('networkEntities.status.inactive')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('networkEntities.pagination.previous')}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('networkEntities.pagination.next')}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {t('networkEntities.pagination.showing', {
                      from: (currentPage - 1) * pageSize + 1,
                      to: Math.min(currentPage * pageSize, totalCount),
                      total: totalCount
                    })}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">{t('networkEntities.pagination.previous')}</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      {t('networkEntities.pagination.page', { current: currentPage, total: totalPages })}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">{t('networkEntities.pagination.next')}</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NetworkEntities;
