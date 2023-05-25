import { useState, useRef } from 'react';
import './CompanyView.css'
import couponModel from '../../models/couponModel';
import CompanyCoupons from '../couponsManager/CompanyCoupons/CompanyCoupons';
import CouponManipulate from '../couponsManager/CouponManipulate/CouponManipulate';
import { useNavigate } from 'react-router-dom';

export default function CompanyView():JSX.Element{
const navi = useNavigate();
    const handleAddClick = () => {
      navi("/company/coupon");
       };
    

     
    return(
        <div className="CompanyView">
<div className="contianer">
          <div className="box1">
        <button className="tugleOption" onClick={handleAddClick}>
            <div className="box">
              <div className="box">
                <div className="last-box box">Add coupon</div>
              </div>
            </div>
        </button>
          </div>

          <div className="box1">
        <button className="tugleOption">
            <div className="box">
              <div className="box">
                <div className="last-box box">My coupons</div>
              </div>
            </div>
        </button>
          </div>
      </div>

    
        <div className="showCase">
      
          <CompanyCoupons/>

        </div>

        </div>
    )

}