import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginUserModel from "../../../models/loginUserModel";
import authService from "../../../services/AuthService";
import * as yup from "yup";
import "./Login.css";
import { authStore, logOut } from "../../../states/AuthState";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillUnlock } from 'react-icons/ai';
import resUserModel from "../../../models/resUserModel";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";

export function Login(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();

  const schema = yup.object().shape({
    username: yup.string()
    .required("Username is required")
      .max(25, "This field must be less than 25 characters long")
    , password: yup.string()
      .required("Password is required")
      .max(20, "This field must be less than 20 characters long")
  });


  const { handleSubmit, register, formState: { errors } } =
    useForm<loginUserModel>({
      mode: "all",
      resolver: yupResolver(schema),
    });

  const passwordErrorMessage =
    <div className="passwordErrorMessage">
      <p> Password must contain at least one digit</p>
      <p> one lowercase letter, one uppercase letter</p>
      <p> one special character, must not contain spaces</p>
      <p> and must be at least 8 characters long</p>
    </div>;


  function login(loginModel: loginUserModel) {
    console.log(1);
    
    setIsLoading(true);
    authService
      .login(loginModel)
      .then(() => {
        setIsLoading(false);
        loginTimeOutTimer();
      })
      .catch((e) => {
        setIsLoading(false);
        const error : ErrorMessage = e.response.data;
        console.log(e.message);
      toast.error(error.message)
      });
  }


  function loginTimeOutTimer() {
    const user: resUserModel = authStore.getState().user!;
    const expiredMillis: number =
      new Date(user.exp * 1000).getTime() - new Date().getTime();


    setTimeout(() => {
      authStore.dispatch(logOut())
      navi("/logout")
    }, expiredMillis);
  }

  return (
    <div className="Login">
      {isLoading ?
        <Loader />
        :
        <>
          <form className="form" onSubmit={handleSubmit(login)}>
            <p id="heading">Login</p>
            <div className="field">
              <MdAlternateEmail />
              <input
                autoComplete="off"
                placeholder="Username"
                className="input-field"
                type="text"
                {...register("username")}
              />
            </div>
            {errors.username?.message && (
              <span className="inputError">
                {errors.username?.message}
              </span>
            )}
            <div className="field">
              <AiFillUnlock />
              <input
                placeholder="Password"
                className="input-field"
                type="password"
                {...register("password")}
              />
            </div>
            {errors.password?.message && (
              <span className="inputError">
                {errors.password.message}
              </span>
            )}
            <div className="btn">
              <button disabled={Object.keys(errors).length !== 0} className="button1"> Login</button>
            </div>
          </form>
        </>}


    </div>
  );
}
