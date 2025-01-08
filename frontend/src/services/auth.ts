import { merlins_api } from ".";


export class Auth{
  static async signUp(nickname:string,email:string,password:string){
    try {
      await merlins_api.post("/users/register",{
        nickname,email,profile_img:"default",password
      }).then(() => {
        this.signIn(email,password);
      })

    } catch (err) {
      console.log("[PSIU] erro ao registrar: ", err);
      return err;
    }
  }
  static async signIn(email:string,password:string){
    try {
      await merlins_api.post("/users/login",{email,password})
      .then((res) => {
        const {token} = res.data;
        sessionStorage.setItem('token',token);
      })
    } catch (err) {
      console.log("[PSIU] erro ao autenticar: ",err)
    }
  }
}

