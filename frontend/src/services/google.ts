import { google_api } from ".";
import { type BooksProps, type BookVolume } from "@/types/books";
const key = import.meta.env.VITE_TOKEN

// consuta https://developers.google.com/books/docs/v1/using?hl=pt-br
// GET https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=yourAPIKey (epub)
// GET https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey (ebook gratis)
// GET https://www.googleapis.com/books/v1/volumes/ id (yTCAlFPjgYC)?key=yourAPIKey (volume unico)

export class GoogleBooks {
  // static async pesquisar(): Promise<BooksProps> {
  //   // q=search+terms esses são os parametros disponiveis.
  //   try {
  //     const { data } = await google_api.get(`/volumes?q=intitle:batman&key=${key}`);
  //     console.log(data);
  //     return data;
  //   } catch (err) {
  //     console.log("[PSIU] erro ao buscar livros: ", err);
  //     throw err;
  //   }
  // }
  static async buscarLivrosPopulares(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'top', // Pesquisa de livros populares (tópicos de interesse geral)
          orderBy: 'relevance', // Ordem pela relevância
          maxResults: 10, // Limita os resultados para os 10 livros mais populares
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros populares: ", err);
      throw err;
    }
  }

  // Método para buscar livros bem avaliados
  static async buscarLivrosBemAvaliados(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'top-rated', // Pesquisa de livros mais bem avaliados
          orderBy: 'rating', // Ordem por avaliação
          maxResults: 10, // Limita os resultados para os 10 livros mais bem avaliados
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros bem avaliados: ", err);
      throw err;
    }
  }

  // Método para buscar livros gratuitos
  static async buscarLivrosGratuitos(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'free', // Pesquisa de livros gratuitos
          filter: 'free-ebooks', // Apenas livros gratuitos
          maxResults: 10, // Limita os resultados para 10
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros gratuitos: ", err);
      throw err;
    }
  }

  // Método para buscar livros por categoria
  static async buscarLivrosPorCategoria(categoria: string): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: `subject:${categoria}`, // Pesquisa por categoria
          maxResults: 10, // Limita os resultados
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros por categoria: ", err);
      throw err;
    }
  }

  static async obterDetalhes(id: string): Promise<BookVolume> {

    try {
      const {data} = await google_api.get(`/volumes/${id}`, {
        params: {
          key: key,
        }
      });

      return data; // Retorna diretamente o objeto BookVolume
    } catch (err) {
      console.error("[PSIU] erro ao obter detalhes do livro: ", err);
      throw err;
    }
  }
  static async pesquisarPorQuery(query: string): Promise<BooksProps> {
    try {
      // Verificando se o query está vazio
      if (!query.trim()) {
        throw new Error("A consulta não pode ser vazia");
      }

      const { data } = await google_api.get(`/volumes?q=${query}`,{
        params: {
          key:key
        }
      });
      return data;
    } catch (err) {
      console.error("[PSIU] erro ao buscar livros por query: ", err);
      throw err;
    }
  }
}




