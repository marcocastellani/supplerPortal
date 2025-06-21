import { EntityType } from '../types/supplyNetworkEntities';
import { TIMING, DATA_CONSTANTS } from './ui';

export interface FilterOption {
  value: string;
  label: string;
}

export const getEntityTypeFilterOptions = (t: (key: string) => string): FilterOption[] => [
  { value: 'all', label: t('networkEntities.filterAll') },
  { value: EntityType.Supplier, label: t('networkEntities.filterSupplier') },
  { value: EntityType.Site, label: t('networkEntities.filterSite') },
  { value: EntityType.SubSupplier, label: t('networkEntities.filterSubSupplier') },
  { value: EntityType.Person, label: t('networkEntities.filterPerson') },
  { value: EntityType.CompanyGroup, label: t('networkEntities.filterCompanyGroup') },
];

export const getStatusFilterOptions = (t: (key: string) => string): FilterOption[] => [
  { value: 'all', label: t('networkEntities.filterAllStatus') },
  { value: 'active', label: t('networkEntities.filterActive') },
  { value: 'inactive', label: t('networkEntities.filterInactive') },
];

export const SEARCH_DEBOUNCE_MS = TIMING.DEBOUNCE_DELAY;
export const DEFAULT_PAGE_SIZE = DATA_CONSTANTS.DEFAULT_PAGE_SIZE;
