import { useEffect, useRef, useState } from "react";
import couponModel from "../../../models/couponModel";
import couponServiceObj from "../../../services/couponServic";
import "./CouponDetail.css";
import { useLocation } from "react-router-dom";
interface Props {
  coupon: couponModel;
}
export default function CouponDetail(props: Props): JSX.Element {
  const coupon: couponModel = props.coupon;
  const startDate: string = new Date(coupon.startDate).toLocaleDateString();
  const endDate: string = new Date(coupon.endDate).toLocaleDateString();
  const location = useLocation();
  const isCustomer = location.pathname.match("customer");

  console.log('test location , isCustomer?: ',isCustomer);
  
  
  const handleBuyCoupon = () => {
    couponServiceObj
      .buyCoupon(coupon)
      .then(() => alert("Buy coupon succses"))
      .catch((e) => {
      
        alert(e.message)});
  };
// edit coupon for company
  useEffect(() => {}, []);
  return (
    <div className="CouponDetail">
      <div className="detaileContainer">
        <div className="detailPic">
          <img src={coupon.image} alt="couponImg" />
        </div>
        <div className="details">
          <h1>{coupon.title}</h1>
          <p>{coupon.category}</p>
          <p>{coupon.description}</p>
          {isCustomer && <p>start date: {startDate}</p>}
          <p>Expiration : {endDate}</p>
          <div className="price">
            <p>Amount : {coupon.amount}</p>
            <p>Price : $ {coupon.price} </p>
          </div>

          {isCustomer && (
            <div className="buyCoupon">
              <button onClick={handleBuyCoupon}>BUY</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
