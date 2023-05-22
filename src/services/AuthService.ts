import axios from "axios";
import loginUserModel from "../models/loginUserModel";
import appConfig from "../config/Config";
import resUserModel from "../models/resUserModel";
import jwt from "jwt-decode";
import companyServiceObj from "./companyService";
import companyModel from "../models/companyModel";
import { ErrorMessage } from "../models/ErrorMessageModel";
import customerServiceObj from "./customerService";
import { authStore, logMeOut, login, setUserName } from "../states/AuthState";

class AuthService {
  async login(loginDetils: loginUserModel): Promise<void> {
    const res = await axios.post<{token : string }>(
      appConfig.login,
      loginDetils
    );
    const token: string = res.data.token;
    const user: resUserModel = jwt(token);
    const role:string = user.auth[0].authority; 
    authStore.dispatch(login(token));
    console.log(1,role);
    console.log(2,user);
    
    if(role==='ROLE_COMPANY'){
      companyServiceObj.getCompanyByEmail(user.username)
      .then((res)=>{authStore.dispatch(setUserName(res.name))})
      .catch((e=>{
        console.log(e);
        
        let errorMessage: ErrorMessage = e.response.data;
        alert(errorMessage);
      }))
    }else if(role==='ROLE_Customer'){
      customerServiceObj.getCustomerByEmail(user.username)
      .then((res)=>{authStore.dispatch(setUserName(res.firstName))})
      .catch((e=>{
        let errorMessage: ErrorMessage = e.response.data;
        alert(errorMessage.message);
      }));
    }else{
      authStore.dispatch(setUserName('admin'))
    }
}

  logout(): void {
    authStore.dispatch(logMeOut());
  }
}

const authService = new AuthService();

export default authService;
