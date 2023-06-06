import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import couponModel from "../../../models/couponModel";
import CouponCard from "../CouponCard/CouponCard";
import './Coupons.css'
import { couponStore } from "../../../states/CouponState";
import { useLocation, useNavigate } from "react-router-dom";
import CouponCard2 from "../CouponCard/CouponCard2";

interface Props {
  coupons: couponModel[];
}


export default function Coupons(props: Props): JSX.Element {
  const navi = useNavigate()
  const coupons: couponModel[] = props.coupons;
  const [filteredCoupons, setFilteredCoupons] = useState<couponModel[]>(coupons);
  const location = useLocation();
  const isBuy = location.pathname.match("/customer/coupon/buyCoupon");
  const isCustomer = location.pathname.match("/customer");
  const isCompany = location.pathname.match("/company");
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  
  useEffect(() => {
    let filteredCoupons = coupons;
    
    if (selectedCategory) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.category.includes(selectedCategory));
    }
    
    if (maxPrice) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.price <= maxPrice);
    }
    
    setFilteredCoupons(filteredCoupons);
  }, [coupons, selectedCategory, maxPrice]);
  
  const handleFilterByCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleFilterByMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
  };
  const handleBuyCoupon = () => {
    navi("/customer/coupon/buyCoupon")
    
  }
  const handleAddCoupon = () => {
    navi("/company/coupon")
    
  }
  
  const buttonByLocation = (): JSX.Element => {
    if (isBuy){
      console.log(isBuy);
      return <span></span>
    }
    if (isCustomer){
      console.log(isCustomer);
      return <button className='purchase' onClick={handleBuyCoupon}>Get More Coupons</button>
    }
    if (isCompany){
     console.log(isCompany);
      return <button className='purchase' onClick={handleAddCoupon}>Add coupon</button>
    }
    return <span></span>
     }
  return (

    <div className="Coupons">
      {coupons.length ?

        <div className="couponsShowCase">

          <div className="headerHolder">

            <div className="filterArea">

              <div className="instructionsHolder">
                <p>Select a category: </p>
                <p>Maximun coupon price in NIS: </p>
              </div>

              <div className="selectorHolder">
                <select onChange={handleFilterByCategory}>
                  <option value="">All</option>
                  {couponStore.getState().categoryList.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <input type="number" step={5} min={5} max={300} onChange={handleFilterByMaxPrice} />
              </div>

            </div>
            <div className="buttonHolder">
              {buttonByLocation()}
            </div>
          </div>
          <div className="couponsHolder">

            {filteredCoupons.map((c) => (
              <CouponCard2 key={c.id} coupon={c} />
            ))}
          </div>
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
