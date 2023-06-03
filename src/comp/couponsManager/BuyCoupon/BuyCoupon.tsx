import { useState, useEffect } from "react";
import couponModel from "../../../models/couponModel";
import couponServiceObj from "../../../services/couponServic";
import "./BuyCoupon.css"
import Coupons from "../Coupons/Coupons";
import { couponStore } from "../../../states/CouponState";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";

export default function BuyCoupon():JSX.Element{

    const [couponsToPurchase, setcouponsToPurchase] = useState<couponModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      couponServiceObj
      .getCouponsToPurchase()
      .then((res) => {
            setcouponsToPurchase(res);
              setIsLoading(false)
          })
          .catch((e) => {
            setIsLoading(false)
            toast.error("CompanyCoupons useEffect "+ e);
          });
        return () => {};
      }, [couponStore.getState().couponList.length]);


    return (

<div className="BuyCoupon">
  <h1>Choose a coupon to Purchase</h1>
{isLoading? 
    <Loader/>  

    :
    <Coupons coupons={couponsToPurchase} />
    }

</div>

    )
}