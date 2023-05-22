import { useEffect, useState } from "react";
import couponModel from "../../../models/couponModel";
import "./CouponCard.css";
import CouponDetail from "../couponDetails/CouponDetail";

interface CouponCardProps {
  coupon: couponModel;
}

export default function CouponCard(props: CouponCardProps): JSX.Element {
  const coupon: couponModel = props.coupon;
  const [isCouponDetail, setIsCouponDetail] = useState(false);
//   useLocation admin / company / customer render accordenlly
  const handleCouponDetais = ()=>{
    setIsCouponDetail(true);
  }
  const handleCloseCouponDetais = ()=>{
    setIsCouponDetail(false);
  }
 
  return (
    <div className="CouponCard cardHolder">
      
      {isCouponDetail &&

          <button className="detailsContainer" onClick={handleCloseCouponDetais}>

      <CouponDetail coupon={coupon}  />
      
          </button>
      
      }
      <div className="couponDetail">
        <button onClick={handleCouponDetais}>
    


      <div className="card-text card-title">
        <h2> {coupon.title}</h2>
      </div>

      <div className="card-pic">
        <img src={coupon.image} alt="couponPic" />
      </div>
      <div className="price-contiener">
        <div className="price-wrapper">
          <div className="card-text card-price">
            <span>$</span>
            <span>{coupon.price}
            </span>
          </div>
        </div>
      </div>
          </button>
      </div>
    </div>
  );
}
