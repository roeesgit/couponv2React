import { createStore } from "redux";
import resUserModel from "../models/resUserModel";
import jwt from "jwt-decode";
import customerModel from "../models/customerModel";
import companyModel from "../models/companyModel";

interface autority {
  authority: string;
}
export class AuthState {
  user: resUserModel | null = null;
  token: string | null = null;
  loggedUserName: string | null = "";
  constructor() {

    const token: string | null = localStorage.getItem("token");
    if (token) {
      if (tokeExp(token)) {
        this.token = token;
        this.user = jwt(token);
      }
      else {
        localStorage.clear();
      }
    }
  }
}
export enum AuthActionType {
  login,
  logout,
  
}

export interface Action {
  type: AuthActionType;
  payload: any;
}

export function login(token: string ,username : string): Action {
  return { type: AuthActionType.login, payload: {token , username} };
}
export function logOut(): Action {
  return { type: AuthActionType.logout, payload: null };
}


export function AuthReducer(
  currentState: AuthState = new AuthState(),
  action: Action
): AuthState {
  const newState: AuthState = { ...currentState };

  switch (action.type) {

    case AuthActionType.login:
      newState.token = action.payload.token;
      newState.user = jwt(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      newState.loggedUserName = action.payload.username;
      break;


    case AuthActionType.logout:
      newState.token = null;
      newState.user = null;
      newState.loggedUserName = null;
      localStorage.clear();
      break;

  }

  return newState;
}

const tokeExp = (token: string): boolean => {
  const expHolder: { exp: number } = jwt(token);
  const expiredMillis: number = 
  new Date(expHolder.exp * 1000).getTime() - new Date().getTime();
  return expiredMillis > 0
}

export const authStore = createStore(AuthReducer);
