// src/context/FavoritesProvider.tsx
"use client"
import { useContext, useEffect, useState } from 'react'
import { FavoritosContext } from './FavoritoContexto'
import { Produto } from '../types/produto'

type Props = {
  children: React.ReactNode
}

export function FavoritesProvider({ children }: Props) {
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  useEffect(() => {
    const favoritosLocalStorage = localStorage.getItem("favoritos");
    if(favoritosLocalStorage){
      setFavoritos(JSON.parse(favoritosLocalStorage));
    }
  }, []);

  const adicionarFavorito = (produto: Produto) => {
    if (!favoritos.find((p) => p.id === produto.id)) {
      setFavoritos([...favoritos, produto])
      localStorage.setItem("favoritos",JSON.stringify([...favoritos,produto]));
    }
  }

  const removerFavorito = (id: string) => {
    const novosFavoritos = favoritos.filter((item) => item.id !== id);
    setFavoritos(novosFavoritos)
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos, adicionarFavorito, removerFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}


export const useFavoritosContext = () => useContext(FavoritosContext);

export const useVerificaSeFavorito = (id: string) => {
  const { favoritos } = useFavoritosContext();
  return favoritos.some((item) => item.id === id);
}

export const useAdicionarFavorito = () => {
  const { adicionarFavorito } = useFavoritosContext();
  return adicionarFavorito;
}

export const useRemoverFavorito = () => {
  const { removerFavorito } = useFavoritosContext();
  return removerFavorito;
}

export const useValorTotalFavoritos = () => {
  const { favoritos } = useFavoritosContext();
  return favoritos.reduce((soma, produto) => soma + Number(produto.preco), 0)
}
