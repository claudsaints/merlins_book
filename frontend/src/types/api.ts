export interface BookSaves{
  read: SaveBook [];
  wishlist:SaveBook [];

}


export interface SaveBook{
  id:number;
  status: string;
  bookId: string;
  link_img: string;
  title: string;
}
