import { NavLink, useNavigate } from 'react-router-dom';
import CustomerCoupons from '../couponsManager/CustomerCoupons/CustomerCoupons';
import './CustomerView.css'
import { useEffect, useState } from 'react';

export default function CustomerView(): JSX.Element {

  const navi = useNavigate()

  const handleBuyCoupon = ()=>{
    navi("/customer/coupon/buyCoupon")

  }
  return (

    <div className="CustomerView">

      <div className="contianer">
        <div className="box1">
          <button className="tugleOption">
            <div className="box">
              <div className="box">
                <div className="box">
                  <div className="box">
                    <div className="last-box box">My Coupons</div>
                  </div>
                </div>
              </div>
          </div>
            </button>
        </div>
      </div>
      


      <div className="showCase">
        <CustomerCoupons />

      </div>



    </div>
  )
}