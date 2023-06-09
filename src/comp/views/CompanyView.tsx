import { useState, useRef } from 'react';
import './CompanyView.css'
import couponModel from '../../models/couponModel';
import CompanyCoupons from '../couponsManager/CompanyCoupons/CompanyCoupons';
import CouponManipulate from '../couponsManager/CouponManipulate/CouponManipulate';
import { NavLink, useNavigate } from 'react-router-dom';

export default function CompanyView(): JSX.Element {


 

  return (
    <div className="CompanyView">
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

        <CompanyCoupons />

      </div>

    </div>
  )

}