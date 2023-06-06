import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { authStore, logOut } from "../../../../states/AuthState";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";


export default function Header(): JSX.Element {
  const navi = useNavigate();
  const userName = useRef<[number, string]>([1, "Guest"]);
  const [showProfile, setShowProfile] = useState(false);


  useEffect(() => {
    initUserName();
    const unsubscribe = authStore.subscribe(() => initUserName());
    return () => unsubscribe();
  }, []);




  const initUserName = () => {
    userName.current[1] = authStore.getState().user ? authStore.getState().user!.loggedUserName : "Guest";
    const role: string | undefined =
      authStore.getState().user?.auth[0].authority;
    if (role) {
      switch (role) {
        case "ROLE_ADMIN":
          userName.current[0] = 2;
          break;
        case "ROLE_COMPANY":
          userName.current[0] = 3;
          break;
        case "ROLE_CUSTOMER":
          userName.current[0] = 4;
          break;
      }
    }
  }

  function logout(): void {
    navi("/logout");
  }

  const goHome = () => {
    switch (userName.current[0]) {
      case 1:
        navi("/home");
        break;
      case 2:
        navi("/admin");
        break;
      case 3:
        navi("/company");
        break;
      case 4:
        navi("/customer");
        break;
    }
  }
  const handelshowProfile = () => {

    setShowProfile(!showProfile);


  }
  return (
    <div className="Header">
      <div className="headerContainer">
        {/* LOGO */}
        <div className="logo">
          <NavLink to="/home">coupon 4 you</NavLink>
        </div>
        <div className="spaceHolder"></div>
        {/* GREERING */}
        <div className="greeting">
          <div className="greetingBox">
            <p className="hello">Hello  {userName.current[1]}</p>
            <div className="staticHolder">
              <div className="static-left-border"> </div>
            </div>
            {authStore.getState().user ? (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="login">
                Login
              </NavLink>
            )}
          </div>
        </div>
        <div className="homePage">
          <GoHome onClick={goHome} className="goHome" />
          <CgProfile onClick={handelshowProfile} className="profile" />
        </div>
      </div>
      {showProfile &&
        <div className="profileMenu">
            comming soon...
        </div>
      }
    </div>
  );
}
