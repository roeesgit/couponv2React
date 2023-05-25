import axios from "axios";
import loginUserModel from "../models/loginUserModel";
import appConfig from "../config/Config";
import resUserModel from "../models/resUserModel";
import jwt from "jwt-decode";
import companyServiceObj from "./companyService";
import { ErrorMessage } from "../models/ErrorMessageModel";
import customerServiceObj from "./customerService";
import { authStore, logOut, login } from "../states/AuthState";

class AuthService {

  async login(loginDetils: loginUserModel): Promise<void> {
    const res = await axios.post<{token : string }>(
      appConfig.login,
      loginDetils
    );
    const token: string = res.data.token;
    const user: resUserModel = jwt(token);
    const role:string = user.auth[0].authority; 
    let userName : string = "admin" 
    if(role==='ROLE_COMPANY'){
      console.log("???");
      companyServiceObj.getCompanyByEmail(user.username)
      .then((res)=>{userName= res.name;})
      .catch((e=>{
        console.log(e);
        let errorMessage: ErrorMessage = e.response.data;
        alert(errorMessage.message);
      }))
    }else if(role==='ROLE_CUSTOMER'){
      customerServiceObj.getCustomerByEmail(user.username)
      .then((res)=>{userName = res.firstName})
      .catch((e=>{
        let errorMessage: ErrorMessage = e.response.data;
        alert(errorMessage.message);
      }));
    }
    console.log("userName: ",userName);
    
    authStore.dispatch(login(token,userName));
}

  logout(): void {
    authStore.dispatch(logOut());
  }
}

const authServiceObj = new AuthService();

export default authServiceObj;
