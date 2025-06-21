import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DashboardFilters {
  status: string;
  priority: string;
  supplier: string;
  search: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

interface Questionnaire {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  dueDate: string;
  supplierName: string;
  supplierCode: string;
  completionRate?: number;
}

interface DashboardState {
  // Data
  questionnaires: Questionnaire[];
  suppliers: string[];
  
  // Filters
  filters: DashboardFilters;
  expandedFilters: boolean;
  
  // Loading states
  isLoadingQuestionnaires: boolean;
  isLoadingSuppliers: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  setQuestionnaires: (questionnaires: Questionnaire[]) => void;
  setSuppliers: (suppliers: string[]) => void;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
  toggleExpandedFilters: () => void;
  setExpandedFilters: (expanded: boolean) => void;
  setLoadingQuestionnaires: (loading: boolean) => void;
  setLoadingSuppliers: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed getters
  getFilteredQuestionnaires: () => Questionnaire[];
  getUpcomingQuestionnaires: () => Questionnaire[];
  getOverdueQuestionnaires: () => Questionnaire[];
}

const initialFilters: DashboardFilters = {
  status: 'all',
  priority: 'all',
  supplier: 'all',
  search: '',
};

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      questionnaires: [],
      suppliers: [],
      filters: initialFilters,
      expandedFilters: false,
      isLoadingQuestionnaires: false,
      isLoadingSuppliers: false,
      error: null,

      // Actions
      setQuestionnaires: (questionnaires) => set({ questionnaires }),
      setSuppliers: (suppliers) => set({ suppliers }),
      
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
        
      resetFilters: () => set({ filters: initialFilters }),
      
      toggleExpandedFilters: () =>
        set((state) => ({ expandedFilters: !state.expandedFilters })),
        
      setExpandedFilters: (expanded) => set({ expandedFilters: expanded }),
      
      setLoadingQuestionnaires: (loading) =>
        set({ isLoadingQuestionnaires: loading }),
        
      setLoadingSuppliers: (loading) =>
        set({ isLoadingSuppliers: loading }),
        
      setError: (error) => set({ error }),

      // Computed getters
      getFilteredQuestionnaires: () => {
        const { questionnaires, filters } = get();
        
        return questionnaires.filter((q) => {
          // Status filter
          if (filters.status !== 'all' && q.status !== filters.status) {
            return false;
          }
          
          // Priority filter
          if (filters.priority !== 'all' && q.priority !== filters.priority) {
            return false;
          }
          
          // Supplier filter
          if (filters.supplier !== 'all' && q.supplierName !== filters.supplier) {
            return false;
          }
          
          // Search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
              q.title.toLowerCase().includes(searchLower) ||
              q.supplierName.toLowerCase().includes(searchLower) ||
              q.supplierCode.toLowerCase().includes(searchLower) ||
              q.type.toLowerCase().includes(searchLower);
            
            if (!matchesSearch) return false;
          }
          
          // Date range filter
          if (filters.dateRange?.start || filters.dateRange?.end) {
            const dueDate = new Date(q.dueDate);
            
            if (filters.dateRange.start && dueDate < filters.dateRange.start) {
              return false;
            }
            
            if (filters.dateRange.end && dueDate > filters.dateRange.end) {
              return false;
            }
          }
          
          return true;
        });
      },
      
      getUpcomingQuestionnaires: () => {
        const { questionnaires } = get();
        const now = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(now.getDate() + 7);
        
        return questionnaires.filter((q) => {
          const dueDate = new Date(q.dueDate);
          return dueDate >= now && dueDate <= sevenDaysFromNow;
        });
      },
      
      getOverdueQuestionnaires: () => {
        const { questionnaires } = get();
        const now = new Date();
        
        return questionnaires.filter((q) => {
          const dueDate = new Date(q.dueDate);
          return dueDate < now && q.status !== 'Completed';
        });
      },
    }),
    {
      name: 'dashboard-store',
    }
  )
);