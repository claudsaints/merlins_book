import { google_api } from ".";
import { type BooksProps, type BookVolume } from "@/types/books";
const key = import.meta.env.VITE_TOKEN

export class GoogleBooks {
  static async buscarLivrosPopulares(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'top',
          orderBy: 'relevance',
          maxResults: 10,
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros populares: ", err);
      throw err;
    }
  }

  static async buscarLivrosBemAvaliados(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'top-rated',
          maxResults: 10,
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros bem avaliados: ", err);
      throw err;
    }
  }


  static async buscarLivrosGratuitos(): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: 'free',
          filter: 'free-ebooks',
          maxResults: 10,
          key: key,
        }
      });

      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros gratuitos: ", err);
      throw err;
    }
  }
  static async buscarLivrosPorCategoria(categoria: string): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: `subject:${categoria}`,
          maxResults: 10,
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
      const { data } = await google_api.get(`/volumes/${id}`, {
        params: {
          key: key,
        }
      });
      console.log(data)
      return data;
    } catch (err) {
      console.error("[PSIU] erro ao obter detalhes do livro: ", err);
      throw err;
    }
  }
  static async pesquisarPorQuery(query: string): Promise<BooksProps> {
    try {

      if (!query.trim()) {
        throw new Error("A consulta não pode ser vazia");
      }

      const { data } = await google_api.get(`/volumes?q=${query}`, {
        params: {
          key: key
        }
      });
      return data;
    } catch (err) {
      console.error("[PSIU] erro ao buscar livros por query: ", err);
      throw err;
    }
  }
}




