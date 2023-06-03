import { createStore } from "redux";
import resUserModel from "../models/resUserModel";
import jwt from "jwt-decode";

export class AuthState {
  user: resUserModel | null = null;
  token: string | null = null;
  constructor() {

    const token: string | null = localStorage.getItem("token");
    console.log(1);
    
    if (token) {
      console.log(2);
      if (tokeExp(token)) {
        this.token = token;
        this.user = jwt(token);
        console.log(this.user);
      }
      else {
        console.log(4);
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

export function login(token: string): Action {
  return { type: AuthActionType.login, payload: token };
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
      newState.token = action.payload;
      newState.user = jwt(action.payload);
      localStorage.setItem("token", action.payload);
      break;


    case AuthActionType.logout:
      newState.token = null;
      newState.user = null;
      localStorage.clear();
      break;

  }

  return newState;
}

const tokeExp = (token: string): boolean => {
  const expHolder: { exp: number } = jwt(token);
  const expiredMillis: number = 
  new Date(expHolder.exp * 1000).getTime() - new Date().getTime();
  console.log(expiredMillis);
  
  return expiredMillis > 0
}

export const authStore = createStore(AuthReducer);
