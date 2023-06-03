import { useEffect, useState } from "react";
import couponModel from "../../../models/couponModel";
import "./CouponCard.css";
import CouponDetail from "../couponDetails/CouponDetail";
import { useLocation, useNavigate } from "react-router-dom";

interface CouponCardProps {
  coupon: couponModel;
}

export default function CouponCard(props: CouponCardProps): JSX.Element {
  const coupon: couponModel = props.coupon;
  const location = useLocation();
  const home = location.pathname.match("/home");
  const navi = useNavigate();
  const isBuy = location.pathname.match("/customer/coupon/buyCoupon");
  const isCustomer = location.pathname.match("/customer");
  const isCompany = location.pathname.match("/company");


  const handleCouponDetais = () => {
    isCompany && navi("/company/coupon/couponDetails/" + coupon.id);
    isBuy && navi("/customer/coupon/buyCouponDetails/" + coupon.id);
    isCustomer&&!isBuy&& navi("/customer/coupon/couponDetails/" + coupon.id);

  }
  

  return (
    <div className="CouponCard cardHolder">

      <div className="couponDetail">

        <button disabled={home ? true : false} onClick={handleCouponDetais}>

          <div className="card-text card-title">
            <h2> {coupon.title}</h2>
          </div>

          <div className="card-pic">
            <img  loading="lazy" src={coupon.image} alt="couponPic" />
          </div>
          <div className="price-contiener">
            <div className="price-wrapper">
              <div className="card-text card-price">
                <span>$</span >
                <span>{coupon.price}
                </span>
              </div >
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
