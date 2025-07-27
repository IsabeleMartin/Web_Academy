// src/context/FavoritesContext.tsx
import { createContext } from 'react'

type FavoritosContextType = {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>> ;
};


// Inicializando o contexto com valor default (array vazio e função vazia)
export const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  setFavoritos: () => {}, // Função vazia por padrão
});