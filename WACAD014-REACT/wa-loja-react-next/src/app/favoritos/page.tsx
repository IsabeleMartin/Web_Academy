"use client";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavoritos";
import { useListaFavoritos } from "../services/useListaFavoritos";

export default function Favoritos() {
    const {favoritos, isPending, isError, refetchFavoritos } = useListaFavoritos();


    if (isPending) return <h5>Carregando...</h5>
  
    if (isError) return <h5>Ocorreu um erro ao carregar os produtos.</h5>
  
    if (!favoritos) return <h5>Não há produtos disponíveis no momento.</h5>

  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos 
        itensFavoritos={favoritos}
        refetchFavoritos={refetchFavoritos}
        />
      </div>
    </main>
  );
}