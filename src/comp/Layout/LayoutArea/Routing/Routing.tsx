import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import App from "../../Loading/App";
import "./Routing.css";
import { Login } from "../../../Auth/Login/Login";
import Home from "../../../Home/Home";
import PageNotFound from "../../PageNotFound/PageNotFound";
import AdminView from "../../../views/AdminView";
import { useEffect } from "react";
import { authStore } from "../../../../states/AuthState";
import CompanyManipulate from "../../../companiesManager/company/CompanyManipulate";
import CustomerManipulate from "../../../customerManager/customer/CustomerManipulate";
import CompanyView from "../../../views/CompanyView";
import CouponManipulate from "../../../couponsManager/CouponManipulate/CouponManipulate";
import Logout from "../../../Auth/Login/Logout";
import CompanyCard from "../../../companiesManager/companyCard/CompanyCard";
import CustomerCard from "../../../customerManager/customerCard/CustomerCard";

export default function Routing(): JSX.Element {
  const navi = useNavigate();
  useEffect(() => {

    naviByRole();
    const unsubscribe = authStore.subscribe(naviByRole);

    return () => unsubscribe();
  }, []);
const naviByRole = () => {
  const role: string | undefined =
    authStore.getState().user?.auth[0].authority;
  if (role) {
    switch (role) {
      case "ROLE_ADMIN":
        navi("/admin");
        break;
      case "ROLE_COMPANY":
        navi("/company");
        break;
      case "ROLE_CUSTOMER":
        navi("/customer");
        break;
    }
  } else {   
    navi("/login");
  }
}
  return (
    <div className="Routing">
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        <Route path="admin/:renderId?" element={<AdminView />} />
        {/* <Route path="admin/company/:companyId?" element={<CompanyManipulate />} /> */}
        <Route path="admin/company/companyDetails/:companyId?" element={<CompanyManipulate />} />
        <Route path="admin/customer" element={<CustomerManipulate />} />
        <Route path="admin/customer/:customerId?" element={<CustomerManipulate />}/>
        <Route path="admin/customer/customerDetails/:customerId?" element={<CustomerCard />}/>
        
        <Route path="company" element={<CompanyView />} />
        <Route path="company/coupon/:couponId?" element={<CouponManipulate />} />

        {/* <Route path="customer" element={<AdminView />} /> */}
      </Routes>
    </div>
  );
}
