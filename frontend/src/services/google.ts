import { google_api } from ".";
import { type BooksProps } from "@/types/books";
const key = import.meta.env.VITE_TOKEN

// consuta https://developers.google.com/books/docs/v1/using?hl=pt-br
// GET https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=yourAPIKey (epub)
// GET https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey (ebook gratis)

// GET https://www.googleapis.com/books/v1/volumes/ id (yTCAlFPjgYC)?key=yourAPIKey (volume unico)

export class GoogleBooks {
  static async pesquisar(): Promise<BooksProps> {
    // q=search+terms esses são os parametros disponiveis.
    try {
      const { data } = await google_api.get(`/volumes?q=flowers+inauthor:keyes&key=${key}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log("[PSIU] erro ao buscar livros: ", err);
      throw err;

    }


  }



}
