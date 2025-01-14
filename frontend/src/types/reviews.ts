export interface BookReviews{
  nickname: string,
  profile_img:string
}


export interface Review{
  bookId:string,
  comment: string ,
  id: number,
  rate: number,
  user: BookReviews
}


