import { useEffect, useRef, useState } from "react";
import couponModel from "../../../models/couponModel";
import couponServiceObj from "../../../services/couponServic";
import "./CouponDetail.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import { couponStore } from "../../../states/CouponState";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";

interface Props {
  coupon: couponModel;
}
export default function CouponDetail(): JSX.Element {

  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();
  const location = useLocation();
  const isUseNow = useRef(false);
  const param = useParams();
  const couponId: number = +param.couponId!
  const home = location.pathname.match("/home");
  const isCustomer = location.pathname.match("/customer");
  const isCompany = location.pathname.match("/company");
  const contianerClassName = useRef(isCustomer ? "customerContieaner" : isCompany ? "companyContainer" : "");
  const coupon = useRef<couponModel>(couponStore.getState().couponList.filter(c => c.id === couponId)[0])
  console.log("startDate ", coupon.current?.startDate);

  const startDate: string = new Date(coupon.current?.startDate).toLocaleDateString();
  const endDate: string = new Date(coupon.current?.endDate).toLocaleDateString();


  const handleUsenow = () => {
    isUseNow.current = false;
  }
  const handleEditCoupon = () => {
    navi("/company/coupon/" + coupon.current?.id)
  }
  const handleDeleteCoupon = () => {

    toast.info(<div>
      <span>delete coupon?</span>
      <button
        className="toastDeleteButton"
        onClick={() => deleteCoupon(couponId)}>
        Delete
      </button>
    </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
      }
    )
  }
  const deleteCoupon = (id: number) => {
    setIsLoading(true);
    couponServiceObj
      .deleteCouponById(id)
      .then(() => {
        toast.success("coupon " + id + " deleted");
        setIsLoading(false);
        navi("/company")
      })
      .catch((e) => {
        setIsLoading(false);
        let error: ErrorMessage = e.response.data;
        toast.error("deleteCoupon: " + error.message);
      })
  }

  const exit = () => {
    isCustomer && navi("/customer");
    isCompany && navi("/company")
  }
  return (
    <>

      {isLoading ?
        <Loader />

        :
        <div className="CouponDetail">
          <div className={"detaileContainer " + contianerClassName.current}>
            <div className="detailPic">
              <img src={coupon.current?.image} alt="couponImg" />
            </div>
            <div className="details">
              <h1>{coupon.current?.title}</h1>
              <p>{coupon.current?.category}</p>
              <p>{coupon.current?.description}</p>
              {!isCustomer && <p>start date: {startDate}</p>}
              <p> {isCustomer ? "Use before " : "Expiration"} : {endDate}</p>
              <div className="price">
                {!isCustomer && <p>Amount : {coupon.current?.amount}</p>}
                {!isCustomer && <p>Price : $ {coupon.current?.price} </p>}
              </div>

              {isCompany && (
                <div className="companybutton">
                  <button onClick={handleEditCoupon}>Edit</button>
                  <button onClick={handleDeleteCoupon}>Delete</button>
                </div>
              )}

              {isCustomer && (
                <div className="useNow">
                  <button disabled onClick={handleUsenow}>Use now!!</button>
                </div>
              )}
              <button onClick={exit}>Exit</button>

            </div>
          </div>
        </div>
      }  </>
  );
}
