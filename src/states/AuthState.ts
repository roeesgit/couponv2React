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
  name: string = "";
  customerUser: customerModel | null = null
  constructor() {

    const token: string | null = localStorage.getItem("token");
    if (token) {
      if (tokeExp(token)) {

        const user: resUserModel = jwt(token);
        this.token = token;
        this.user = user;
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
  setUserName,
}

export interface Action {
  type: AuthActionType;
  payload: any;
}

export function login(token: string): Action {
  return { type: AuthActionType.login, payload: token };
}
export function logMeOut(): Action {
  return { type: AuthActionType.logout, payload: null };
}
export function setUserName(name: string): Action {
  return { type: AuthActionType.setUserName, payload: name };
}


export function AuthReducer(
  currentState: AuthState = new AuthState(),
  action: Action
): AuthState {
  const newState: AuthState = { ...currentState };

  switch (action.type) {
    case AuthActionType.login:
      newState.token = action.payload;
      const user: resUserModel = jwt(newState.token!);
      newState.user = user;

      localStorage.setItem("token", newState.token!);

      const expiredMillis: number =
        new Date(user.exp * 1000).getTime() - new Date().getTime();


      setTimeout(() => {
        authStore.dispatch(logMeOut())
      }, expiredMillis);
      break;

    case AuthActionType.setUserName:
      newState.name = action.payload;
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
  const expiredMillis: number = new Date(expHolder.exp * 1000).getTime() - new Date().getTime();
  return expiredMillis > 0
}

export const authStore = createStore(AuthReducer);
