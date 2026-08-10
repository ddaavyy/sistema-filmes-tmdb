import { createContext } from "react";

export interface AppContextValue {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
