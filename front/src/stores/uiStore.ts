import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface DialogState {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

interface UIState {
  // Global loading states
  globalLoading: boolean;
  loadingMessage: string;
  
  // Dialogs
  dialogs: Record<string, DialogState>;
  
  // Notifications/Snackbars
  notifications: Notification[];
  
  // Sidebar/Drawer states
  sidebarOpen: boolean;
  drawerOpen: boolean;
  
  // Modal states
  modals: Record<string, boolean>;
  
  // Tab/Accordion states
  activeTab: Record<string, number | string>;
  expandedPanels: Record<string, boolean>;
  
  // Actions
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  // Dialog actions
  openDialog: (key: string, options?: Omit<DialogState, 'open'>) => void;
  closeDialog: (key: string) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Sidebar/Drawer actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  
  // Modal actions
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
  toggleModal: (key: string) => void;
  
  // Tab/Accordion actions
  setActiveTab: (key: string, value: number | string) => void;
  togglePanel: (key: string) => void;
  setPanelExpanded: (key: string, expanded: boolean) => void;
  
  // Utility
  reset: () => void;
}

const initialState = {
  globalLoading: false,
  loadingMessage: '',
  dialogs: {},
  notifications: [],
  sidebarOpen: true,
  drawerOpen: false,
  modals: {},
  activeTab: {},
  expandedPanels: {},
};

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      ...initialState,

      // Global loading
      setGlobalLoading: (loading, message = '') =>
        set({ globalLoading: loading, loadingMessage: message }),

      // Dialog actions
      openDialog: (key, options = {}) =>
        set((state) => ({
          dialogs: {
            ...state.dialogs,
            [key]: { open: true, ...options },
          },
        })),

      closeDialog: (key) =>
        set((state) => ({
          dialogs: {
            ...state.dialogs,
            [key]: { ...state.dialogs[key], open: false },
          },
        })),

      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = { id, ...notification };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            set((state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }));
          }, notification.duration || 5000);
        }
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      // Sidebar/Drawer actions
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      toggleDrawer: () =>
        set((state) => ({ drawerOpen: !state.drawerOpen })),
      
      setDrawerOpen: (open) => set({ drawerOpen: open }),

      // Modal actions
      openModal: (key) =>
        set((state) => ({
          modals: { ...state.modals, [key]: true },
        })),

      closeModal: (key) =>
        set((state) => ({
          modals: { ...state.modals, [key]: false },
        })),

      toggleModal: (key) =>
        set((state) => ({
          modals: { ...state.modals, [key]: !state.modals[key] },
        })),

      // Tab/Accordion actions
      setActiveTab: (key, value) =>
        set((state) => ({
          activeTab: { ...state.activeTab, [key]: value },
        })),

      togglePanel: (key) =>
        set((state) => ({
          expandedPanels: {
            ...state.expandedPanels,
            [key]: !state.expandedPanels[key],
          },
        })),

      setPanelExpanded: (key, expanded) =>
        set((state) => ({
          expandedPanels: { ...state.expandedPanels, [key]: expanded },
        })),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'ui-store',
    }
  )
);

// Helper hooks for specific UI elements
export const useDialog = (key: string) => {
  const dialog = useUIStore((state) => state.dialogs[key] || { open: false });
  const openDialog = useUIStore((state) => state.openDialog);
  const closeDialog = useUIStore((state) => state.closeDialog);
  
  return {
    ...dialog,
    open: () => openDialog(key),
    close: () => closeDialog(key),
  };
};

export const useModal = (key: string) => {
  const isOpen = useUIStore((state) => state.modals[key] || false);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const toggleModal = useUIStore((state) => state.toggleModal);
  
  return {
    isOpen,
    open: () => openModal(key),
    close: () => closeModal(key),
    toggle: () => toggleModal(key),
  };
};

export const useTab = (key: string, defaultValue: number | string = 0) => {
  const activeTab = useUIStore((state) => state.activeTab[key] ?? defaultValue);
  const setActiveTab = useUIStore((state) => state.setActiveTab);
  
  return {
    activeTab,
    setActiveTab: (value: number | string) => setActiveTab(key, value),
  };
};