
import { Produto } from "../../types/produto";
import Image from "next/image";
import { useAddFavorito } from "@/app/services/useAddFavorito";
import {useRouter} from "next/navigation"
import { toast } from "react-toastify";




interface ICardProdutoProps {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({ produto, adicionarAoCarrinho }: ICardProdutoProps) {
 
  const {isPending, addFavorito} = useAddFavorito(
    () => toast.success("Produto favoritado com sucesso"),
    () => toast.error("Algo deu errado")
  );
   
   const router = useRouter(); // Colocando o useRouter dentro do componente

  // Função que lida com a navegação
  const verDetalhesProduto = (nomeProduto: string) => {
    if(nomeProduto)router.push(`/produto/${nomeProduto}`);
  };



  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.fotos[0].titulo}
          width={300}
          height={320}
          onClick={()=> verDetalhesProduto(produto.nome)}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => adicionarAoCarrinho(produto)}
          >
            Adicionar no carrinho
          </button>

          <button
          className="btn btn-light d-block w-100 mt-2"
          type="button"
          onClick={() => addFavorito(produto)}
          >
            {isPending ? "Favoritando..." : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
