import { google_api } from ".";
import { Reviews } from "./reviews";
import { type BooksProps, type BookVolume } from "@/types/books";

const key = import.meta.env.VITE_TOKEN

export class GoogleBooks {
  static async buscarLivrosBemAvaliados():Promise<BooksProps> {
    const data:BooksProps = {items: []}
    const ranked = await Reviews.getRanked();
    try {
      for (const obj of ranked) {
        //averiguar ou manteu uma função repetida apenas para esse metodos
        const bookData: BookVolume = await this.obterDetalhes(obj.bookId);
        data.items.push(bookData);
      }
      console.log("Data", data)
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
  static async buscarLivrosPorCategoria(categoria: string, startIndex = 0): Promise<BooksProps> {
    try {
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: `subject:${categoria}`,
          maxResults: 10,
          startIndex,
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
  static async pesquisarPorQuery(query: string, startIndex = 0): Promise<BooksProps> {
    try {

      if (!query.trim()) {
        throw new Error("A consulta não pode ser vazia");
      }
      const { data } = await google_api.get(`/volumes`, {
        params: {
          q: query,
          key: key,
          startIndex,
          maxResults: 10
        }
      });
      return data;
    } catch (err) {
      console.error("[PSIU] erro ao buscar livros por query: ", err);
      throw err;
    }
  }
}




