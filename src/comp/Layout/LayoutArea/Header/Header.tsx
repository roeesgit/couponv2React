import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { authStore, logMeOut } from "../../../../states/AuthState";
import resUserModel from "../../../../models/resUserModel";
export default function Header(): JSX.Element {
  const navi = useNavigate();

  const userName = useRef("");

  useEffect(() => {
    if (authStore.getState().name) {
      userName.current = authStore.getState().name;
    }
    const unsubscribe = authStore.subscribe(() => {
      userName.current = authStore.getState().name;    });

    return () => unsubscribe();
  }, []);
  function logout(): void {
    authStore.dispatch(logMeOut());
    navi("/home");
  }
  return (
    <div className="Header">
      <div className="headerContainer">
        {/* LOGO */}
        <div className="logo">
          <NavLink to="/home">coupon 4 you</NavLink>
        </div>

        {/* GREERING */}
        <div className="greeting">
          {userName.current.length>0 ? (
            // TRUE
            <div className="greetingBox">
              <p className="hello">Hello- {userName.current}</p>
              <div className="staticHolder">
                <div className="static-left-border"></div>
              </div>
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            // FALSE
            <div className="greetingBox">
              <p className="hello">Hello Guest</p>
              <div className="staticHolder">
                <div className="static-left-border"> </div>
              </div>
              <NavLink to="/login" className="login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
