import { useEffect, useState } from "react";
import couponModel from "../../../models/couponModel";
import "./CouponCard2.css";
import { useLocation, useNavigate } from "react-router-dom";
import {MdDiscount }from 'react-icons/md'

interface CouponCardProps {
  coupon: couponModel;
}

export default function CouponCard2(props: CouponCardProps): JSX.Element {
  const coupon: couponModel = props.coupon;
  const location = useLocation();
  const home = location.pathname.match("/home");
  const navi = useNavigate();
  const isBuy = location.pathname.match("/customer/coupon/buyCoupon");
  const isCustomer = location.pathname.match("/customer");
  const isCompany = location.pathname.match("/company");
  const endDate: string = new Date(coupon.endDate).toLocaleDateString();


  const handleCouponDetais = () => {
    isCompany && navi("/company/coupon/couponDetails/" + coupon.id);
    isBuy && navi("/customer/coupon/buyCouponDetails/" + coupon.id);
    isCustomer&&!isBuy&& navi("/customer/coupon/couponDetails/" + coupon.id);

  }
  

  return (
<>
<button disabled={home ? true : false} onClick={handleCouponDetais}>
<div className="CouponCard2">
  <div className="image">
  <img  loading="lazy" src={coupon.image} alt="couponPic" />
  </div>
  <div className="content">
    <p className="text-1">
    {coupon.title}
    </p>

    <div className="text-2">
      <span>
      Get 35% off
      </span>
    
    </div>

    <a className="action" href="#">
      Get Discount
    </a>

    <p className="date">
        offer valid until {endDate}
    </p>
  </div>
    </div>
</button>
</>
  );
}
