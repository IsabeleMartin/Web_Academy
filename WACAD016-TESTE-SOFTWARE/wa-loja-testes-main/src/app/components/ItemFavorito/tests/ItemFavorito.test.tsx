import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemFavorito from "../ItemFavorito";
import { calculaValorComPorcentagemDeDesconto } from "../../../helpers";

// Criando o mock para a função de cálculo de desconto
jest.mock("../../../helpers", () => ({
  calculaValorComPorcentagemDeDesconto: jest.fn(),
}));

describe("ItemFavorito", () => {
  const produtoSimulado = {
    id: "notebook-3",
    fotos: [
      {
        titulo: "notebook-4",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg",
      },
      {
        titulo: "smartwatch-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-2.jpg",
      },
    ],
    nome: "Notebook",
    preco: "2300",
    desconto: 15,
    descricao: "descrição legal",
    vendido: "false",
    usuario_id: "lobo@origamid.com",
  };

  
  
  const mockSetFavoritos = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Simulando o cálculo de desconto
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(80);
  });

  it("deve exibir corretamente as informações do produto favorito", () => {
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={produtoSimulado} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Notebook")).toBeInTheDocument(); // Verifica o nome do produto
    expect(screen.getByText("descrição legal")).toBeInTheDocument(); // Verifica a descrição
    expect(screen.getByText("R$ 80.00")).toBeInTheDocument(); // Verifica o preço com desconto
    expect(screen.getByText("15%")).toBeInTheDocument(); // Verifica o percentual de desconto
    expect(screen.getByAltText("notebook-4")).toBeInTheDocument(); // Verifica a imagem do produto
  });

  it("deve invocar a função de remoção ao clicar no botão 'Remover'", async () => {
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={produtoSimulado} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );

    const botaoDeRemover = screen.getByRole("button", { name: /Remover/i });
    await userEvent.click(botaoDeRemover);

    expect(mockSetFavoritos).toHaveBeenCalledTimes(1);
    expect(mockSetFavoritos).toHaveBeenCalledWith(expect.any(Function));
  });

  it("deve remover o produto da lista de favoritos quando clicado em 'Remover'", async () => {
    // Adicionando o produto à lista de favoritos antes do clique
  

    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={produtoSimulado} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );

    const botaoRemover = screen.getByRole("button", { name: /Remover/i });
    await userEvent.click(botaoRemover);

    // Verifica se o produto foi removido da lista de favoritos
    expect(mockSetFavoritos).not.toContain(produtoSimulado);
  });

  it("deve ajustar corretamente o preço com base no desconto aplicado", () => {
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(75);

    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={produtoSimulado} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );

    expect(screen.getByText("R$ 75.00")).toBeInTheDocument(); // Verifica o preço atualizado
  });

  it("deve mostrar a imagem correta do produto quando houver múltiplas imagens", () => {
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={produtoSimulado} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );

    // Verificando se a imagem correta é exibida (primeira imagem)
    expect(screen.getByAltText("notebook-4")).toBeInTheDocument();
  });

  it("deve mostrar o preço correto para diferentes valores de desconto", () => {
    // Teste com 10% de desconto
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(2070);
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={{ ...produtoSimulado, desconto: 10 }} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );
    expect(screen.getByText("R$ 2070.00")).toBeInTheDocument();

    // Teste com 30% de desconto
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(1610);
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={{ ...produtoSimulado, desconto: 30 }} setFavoritos={mockSetFavoritos} />
        </tbody>
      </table>
    );
    expect(screen.getByText("R$ 1610.00")).toBeInTheDocument();
  });

    
});
