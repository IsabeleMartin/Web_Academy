// src/context/FavoritesProvider.tsx
"use client"
import { useState } from 'react'
import { FavoritosContext } from './FavoritoContexto'

type Props = {
  children: React.ReactNode
}

export function FavoritesProvider({ children }: Props) {
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  )
}
