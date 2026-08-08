import { createContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AppContextValue {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite: (id: number) => {
        setFavorites((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        );
      },
    }),
    [favorites, setFavorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
