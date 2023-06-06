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

  const handlePageNotFound = () => {

    navi("/PageNotFound")
  }

  return (
    <>

      {isLoading ?
        <Loader />

        :
        <div className="CouponDetail">
          <div className="contianer">
            <div className="box1">
              <button className="tugleOption">
                <div className="box">
                  <div className="box">
                    <div className="box">
                      <div className="box">
                        <div className="last-box box">My Coupon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>




          <div className="detailContainer ">
            <div className="head">

              <div className="detailPic">
                <img src={coupon.current?.image} alt="couponImg" />
              </div>
              <div className="details">
                <h2>{coupon.current?.title}</h2>
                <p>{coupon.current?.category}</p>
                <p>{coupon.current?.description}</p>
                {!isCustomer && <p>start date: {startDate}</p>}
                <p> {isCustomer ? "Use before " : "Expiration"} : {endDate}</p>
                <div className="price">
                  {!isCustomer && <p>Amount : {coupon.current?.amount}</p>}
                  {!isCustomer && <p>Price : NIS {coupon.current?.price} </p>}
                </div>
              </div>

            </div>
          </div>
          <div className="buttonsArea">

            {isCompany && (
              <>
                <button onClick={handleEditCoupon}>Edit</button>
                <button onClick={handleDeleteCoupon}>Delete</button>
              </>
            )}

            <button onClick={exit}>Close</button>
            {isCustomer && (
              <button className="useNow" disabled onClick={handlePageNotFound}>Redeem Coupon</button>
            )}

          </div>
        </div>
      }  </>
  );
}
