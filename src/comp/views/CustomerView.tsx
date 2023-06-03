import { NavLink, useNavigate } from 'react-router-dom';
import CustomerCoupons from '../couponsManager/CustomerCoupons/CustomerCoupons';
import './CustomerView.css'
import { useEffect, useState } from 'react';

export default function CustomerView(): JSX.Element {

  return (

    <div className="CustomerView">
      <div className="contianer">
        <div className="box1">
          <button className="tugleOption">
            <div className="box">
              <div className="box">
                <div className="box">
                  <div className="box">
                    <div className="last-box box">My coupons</div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>


      <div className="showCase">
        <div className="navLinkHolder ">
          <NavLink to="/customer/coupon/buyCoupon">
            <p className="addCustomerbutton">Buy Coupon</p>
          </NavLink>
        </div>
        <CustomerCoupons />

      </div>



    </div>
  )
}