import { merlins_api } from ".";

export class Books {
  static async getUserSaves() {
    try {
      const res = await merlins_api.get("/books/find");
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async saveBook( status: string,
    bookId: string,
    link_img: string,
    title: string
) {
    try {
      const res = await merlins_api.post("/books/create",{status,bookId,link_img,title});
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  }
  static async deleteBook(
    id: number,

  ) {
    try {
      const res = await merlins_api.delete("/books/delete", {data: {id}});
      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

}