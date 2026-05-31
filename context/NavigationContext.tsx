import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Page =
  | 'home'
  | 'flights'
  | 'admissions'
  | 'visa'
  | 'proof-of-funds'
  | 'tours'
  | 'about'
  | 'portal'
  | 'contact';

interface NavigationContextValue {
  currentPage: Page;
  navigate: (page: Page, section?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  currentPage: 'home',
  navigate: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = useCallback((page: Page, section?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
