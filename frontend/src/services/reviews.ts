import type { RankedReviews } from "@/types/generic";
import { merlins_api } from ".";

export class Reviews {
  static async createReview(bookId:string,rate:number,comment:string){
    try {
      const res = await merlins_api.post("/reviews/create", {bookId,rate,comment})
      console.log("post",res)
      return res.data;
    } catch (error) {
      console.log(error)
    }

  }
  static async findBookReviews(bookId:string){
    try {
      const res = await merlins_api.post("/reviews/find/book", {bookId})
      console.log("Reviw",res)
      return res.data;

    } catch (error) {
      console.log(error)

    }
  }
  static async findUserReviews(){
    try {
      const res = await merlins_api.get("/reviews/find/user")
      console.log("profile",res)
      return res.data;

    } catch (error) {
      console.log(error)

    }

  }
  static async getRanked():Promise<RankedReviews[]>{
    try{
      const {data} = await merlins_api.get("/reviews/ranked");
      return data;
    }catch(error){
      console.log(error);
      throw new Error("[Psiu] Error to get ranked reviews");

    }
  }
}
