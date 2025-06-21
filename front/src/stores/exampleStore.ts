import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Example: Counter Store with persistence and devtools
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        setCount: (count) => set({ count }),
      }),
      {
        name: 'counter-storage', // name of the storage (must be unique)
      }
    ),
    {
      name: 'counter-store', // name in Redux DevTools
    }
  )
);

// Example: User Store without persistence
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (userId: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  fetchUser: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch user', isLoading: false });
    }
  },
  
  logout: () => set({ user: null }),
}));

// Example: Global UI Store
interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  notifications: string[];
  toggleSidebar: () => void;
  setModalOpen: (open: boolean) => void;
  addNotification: (message: string) => void;
  removeNotification: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  modalOpen: false,
  notifications: [],
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setModalOpen: (open: boolean) => set({ modalOpen: open }),
  addNotification: (message: string) => 
    set((state) => ({ notifications: [...state.notifications, message] })),
  removeNotification: (index: number) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index),
    })),
}));