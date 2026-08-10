import { type ReactNode, useMemo } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AppContext } from "./context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite: (id: number) => {
        setFavorites((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
      },
    }),
    [favorites, setFavorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
