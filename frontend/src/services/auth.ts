import { merlins_api } from ".";


export class Auth{
  static async singUp(nickname:string,email:string,password:string){
    try {
      await merlins_api.post("/user/register",{
        nickname,email,profile_img:"default",password
      }).then(() => {
        this.singIn();
      })

    } catch (err) {
      console.log("[PSIU] erro ao registrar: ",err);
    }


  }
  static async singIn(){

  }
}

