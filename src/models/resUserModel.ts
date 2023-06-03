interface autority{
  authority : string
}

export default interface resUserModel{

    id: number;
    username: string;
    loggedUserName: string;
    auth: autority[];
    exp:number;
    
    
   
  }
  


