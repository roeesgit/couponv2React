import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./Routing.css";
import { Login } from "../../../Auth/Login/Login";
import Home from "../../../Home/Home";
import PageNotFound from "../../PageNotFound/PageNotFound";
import AdminView from "../../../views/AdminView";
import { useEffect, useRef, useState } from "react";
import { authStore } from "../../../../states/AuthState";
import CompanyManipulate from "../../../companiesManager/company/CompanyManipulate";
import CustomerManipulate from "../../../customerManager/customer/CustomerManipulate";
import CompanyView from "../../../views/CompanyView";
import CouponManipulate from "../../../couponsManager/CouponManipulate/CouponManipulate";
import Logout from "../../../Auth/Login/Logout";
import CompanyCard from "../../../companiesManager/companyCard/CompanyCard";
import CustomerCard from "../../../customerManager/customerCard/CustomerCard";
import NoConnection from "../../NoConnection/NoConnection";
import authServiceObj from "../../../../services/AuthService";
import CustomerView from "../../../views/CustomerView";
import BuyCoupon from "../../../couponsManager/BuyCoupon/BuyCoupon";
import companyModel from "../../../../models/companyModel";
import CouponDetail from "../../../couponsManager/couponDetails/CouponDetail";
import CouponCard from "../../../couponsManager/CouponCard/CouponCard";
import Help from "../../../Help/Help";
import BuyAction from "../../../couponsManager/BuyCoupon/BuyAction";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Routing(): JSX.Element {
  const location = useLocation();
  const navi = useNavigate();
  const [isConnected, setisConnected] = useState(true)

  useEffect(() => {
    checkConnection();
  }, [location.pathname]);


  useEffect(() => {

    naviByRole();

    const unsubscribe = authStore.subscribe(naviByRole);

    return () => unsubscribe();

  }, []);


  const naviByRole = () => {
    if (isConnected) {

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
      }
      else {
        navi("/home");
      }
    }
  }


  const checkConnection = () => {

    authServiceObj.isConnected()
      .then(() => {
        setisConnected(true)
      })
      .catch(() => {
        // toast.warning("Connection attempt faild")
        setisConnected(false);
      });

  }

  return (
    <>
      {isConnected ?
        <div className="Routing">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="help" element={<Help />} />

            <Route path="admin/:renderId?" element={<AdminView />} />
            <Route path="admin/company/:companyId?" element={<CompanyCard />} />
            <Route path="admin/company/companyDetails/:companyId?" element={<CompanyManipulate />} />
            <Route path="admin/customer" element={<CustomerManipulate />} />
            <Route path="admin/customer/:customerId?" element={<CustomerCard />} />
            <Route path="admin/customer/customerDetails/:customerId?" element={<CustomerManipulate />} />

            <Route path="company" element={<CompanyView />} />
            <Route path="company/coupon/:couponId?" element={<CouponManipulate />} />
            <Route path="company/coupon/couponDetails/:couponId?" element={<CouponDetail />} />

            <Route path="customer" element={<CustomerView />} />
            <Route path="customer/coupon/buyCoupon" element={<BuyCoupon />} />
            <Route path="customer/coupon/couponDetails/:couponId" element={<CouponDetail />} />
            <Route path="customer/coupon/buyCouponDetails/:couponId" element={<BuyAction />} />
          </Routes>
        </div>
        :
        <NoConnection />
      }
    </>);
}
