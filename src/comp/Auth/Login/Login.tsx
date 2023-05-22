import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginUserModel from "../../../models/loginUserModel";
import authService from "../../../services/AuthService";
import * as yup from "yup";
import "./Login.css";
import { authStore } from "../../../states/AuthState";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import App from "../../Layout/Loading/App";
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillUnlock } from 'react-icons/ai';


export function Login(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);


  const schema = yup.object().shape({
    username: yup.string().required("Username is required")
      .matches(/.+@+.+\..+/, "Please provide a valid username address")
      .min(3, "This field must be at least 3 characters long")
      .max(25, "This field must be less than 25 characters long")
    , password: yup.string()
      .required("Password is required")
      .max(20, "This field must be less than 20 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
        "Password must contain at least one digit,\none lowercase letter, one uppercase letter, one special character, must not contain spaces, and must be at least 8 characters long")
  });
  const { handleSubmit, register, formState: { errors } } =
    useForm<loginUserModel>({
      mode: "all",
      resolver: yupResolver(schema),
    });

  const passwordErrorMessage =
    <div>
      <p> Password must contain at least one digit</p>
      <p> one lowercase letter, one uppercase letter</p>
      <p> one special character, must not contain spaces</p>
      <p> and must be at least 8 characters long</p>
    </div>;





   function login(loginModel: loginUserModel) {
    setIsLoading(true);
    authService
    .login(loginModel)
    .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
       alert("Incorrect login details");
      });
  }

  return (
    <div className="Login">
      {isLoading ? 
        <App />
       : 
        <>
          <form className="form" onSubmit={handleSubmit(login)}>
            <p id="heading">Login</p>
            <div className="field">
              <MdAlternateEmail/>
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
              <AiFillUnlock/>
              <input
                placeholder="Password"
                className="input-field"
                type="password"
                {...register("password")}
              />
            </div>
            {errors.password?.message && (
              <span className="inputError">
                {passwordErrorMessage}
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
