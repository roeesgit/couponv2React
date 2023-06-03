import axios from "axios";
import loginUserModel from "../models/loginUserModel";
import appConfig from "../config/Config";
import { authStore, logOut, login } from "../states/AuthState";

class AuthService {

  async login(loginDetils: loginUserModel): Promise<void> {
    const res = await axios.post<{token : string }>(
      appConfig.auth+"/login",
      loginDetils
      );
    authStore.dispatch(login(res.data.token));
}

  logout(): void {
    authStore.dispatch(logOut());
  }

  async isConnected():Promise<void>{
    await axios.get(
      appConfig.auth+"/isConnected"
    )
  }
}

const authServiceObj = new AuthService();

export default authServiceObj;
