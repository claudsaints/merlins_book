import { merlins_api } from ".";

export class Reviews {
  static async createReview(bookId:string,rate:number,comment:string){
    try {
      const res = await merlins_api.post("/reviews/create", {bookId,rate,comment})
      return res.data;
    } catch (error) {
      console.log(error)
    }

  }
  static async findBookReviews(bookId:string){
    try {
      const res = await merlins_api.get("/reviews/find/book", {data: {bookId}})
      return res.data;

    } catch (error) {
      console.log(error)

    }
  }
  static async findUserReviews(){
    try {
      const res = await merlins_api.get("/reviews/find/user")
      return res.data;

    } catch (error) {
      console.log(error)

    }

  }
}
