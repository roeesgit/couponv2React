import { ChangeEvent, ChangeEventHandler, useState } from "react";
import couponModel from "../../../models/couponModel";
import CouponCard from "../CouponCard/CouponCard";
import './Coupons.css'

interface Props {
  coupons: couponModel[];
}


export default function Coupons(props: Props): JSX.Element {
  const coupons: couponModel[] = props.coupons;
  const [sortBy, setSortBy] = useState('title');
  // const sortedCoupons = sortCoupons(coupons, sortBy);

  
  function handleSortChange (event:ChangeEvent<HTMLSelectElement>){
    setSortBy(event.target.value);
  };

  return (
   
      <div className="Coupons">
      {coupons.length?
      <div className="couponsShowCase">

      <div className="sortBy">
       
 
      </div>
      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} />
        ))}
        </div>
          :
          <>
       <h1>No coupons to show.... 😒</h1>
       <h1>It's time to do something about it...</h1>
       </>
       }
          </div>
  );
}
