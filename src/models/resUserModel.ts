import jwt from 'jwt-decode';
interface autority{
  authority : string
}
class resUserModel{

    id: number;
    username: string;
    auth: autority[];
    exp:number;
    
    
    constructor(id: number, username: string, auth: autority[],exp:number) {
      this.id = id;
      this.username = username;
      this.auth= auth; 
      this.exp = exp;
    }
  
    hasAuthority(auth: string) {
      return this.auth.includes({authority:auth});
    }
  }
  
//  export function buildUserFromToken(token: string): resUserModel {
//     const container: { user: resUserModel } = jwt(token);
//     const id = container.user.id;
//     const username = container.user.username;
//     const authorities : string[] = container.user.auth.map(({authority: string}) => auth);
//     const exp = container.user.exp;
//     return new resUserModel(id, username, authorities,exp);
   
// }


export default resUserModel;


