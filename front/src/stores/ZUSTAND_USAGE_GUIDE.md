# Zustand Usage Guide

## Quick Start

### 1. Basic Store Creation

```typescript
import { create } from 'zustand';

interface StoreState {
  // State
  count: number;
  // Actions
  increment: () => void;
  decrement: () => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### 2. Using the Store in Components

```typescript
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Advanced Features

### 1. Async Actions

```typescript
interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
```

### 2. Persist Middleware

```typescript
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // your store
    }),
    {
      name: 'app-storage', // unique name
      // optional: choose what to persist
      partialize: (state) => ({ count: state.count }),
    }
  )
);
```

### 3. DevTools Middleware

```typescript
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // your store
    }),
    {
      name: 'MyStore', // name in Redux DevTools
    }
  )
);
```

### 4. Combining Middleware

```typescript
const useStore = create(
  devtools(
    persist(
      (set) => ({
        // your store
      }),
      { name: 'app-storage' }
    ),
    { name: 'MyStore' }
  )
);
```

## Best Practices

### 1. Store Organization

Create separate stores for different domains:

```
src/stores/
  ├── authStore.ts      // Authentication state
  ├── uiStore.ts        // UI state (modals, sidebars, etc.)
  ├── dataStore.ts      // Application data
  └── index.ts          // Export all stores
```

### 2. Selector Patterns

```typescript
// Good: Subscribe to specific state
const count = useStore((state) => state.count);

// Avoid: Subscribing to entire store
const store = useStore(); // Re-renders on any state change
```

### 3. Computed Values

```typescript
const useStore = create((set, get) => ({
  items: [],
  filter: '',
  // Computed getter
  get filteredItems() {
    return get().items.filter(item => 
      item.name.includes(get().filter)
    );
  },
}));
```

### 4. Actions Outside Components

```typescript
// Can use store outside React
const { getState, setState } = useStore;

// Read state
const currentCount = getState().count;

// Update state
setState({ count: 10 });
```

## Migration from Redux

### Redux Pattern
```typescript
// Action
dispatch(setUser(userData));

// Selector
const user = useSelector(state => state.user);
```

### Zustand Pattern
```typescript
// Direct action call
const setUser = useStore(state => state.setUser);
setUser(userData);

// Direct state access
const user = useStore(state => state.user);
```

## Common Patterns

### 1. Loading States

```typescript
interface Store {
  data: Data | null;
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}
```

### 2. Form Management

```typescript
interface FormStore {
  values: Record<string, any>;
  errors: Record<string, string>;
  setValue: (key: string, value: any) => void;
  setError: (key: string, error: string) => void;
  reset: () => void;
}
```

### 3. Optimistic Updates

```typescript
const useStore = create((set) => ({
  items: [],
  addItem: async (item) => {
    // Optimistic update
    set(state => ({ items: [...state.items, item] }));
    
    try {
      await api.createItem(item);
    } catch (error) {
      // Revert on error
      set(state => ({
        items: state.items.filter(i => i.id !== item.id)
      }));
    }
  },
}));
```

## Testing

```typescript
import { renderHook, act } from '@testing-library/react-hooks';

test('should increment count', () => {
  const { result } = renderHook(() => useStore());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Performance Tips

1. **Use selectors** to subscribe to specific state slices
2. **Shallow compare** arrays/objects when needed
3. **Split large stores** into smaller, focused stores
4. **Memoize** expensive computations

## TypeScript Tips

```typescript
// Type the entire store
interface Store {
  count: number;
  inc: () => void;
}

const useStore = create<Store>()((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

// Auto-infer types
const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
```