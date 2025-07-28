// src/context/FavoritoContexto.tsx
import { createContext } from "react";
import { Produto } from "../types/produto";

interface FavoritosContextType {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
  adicionarFavorito: (produto: Produto) => void;
  removerFavorito: (id: string) => void;
}

export const FavoritosContext = createContext({} as FavoritosContextType);
