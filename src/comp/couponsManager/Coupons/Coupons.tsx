import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import couponModel from "../../../models/couponModel";
import CouponCard from "../CouponCard/CouponCard";
import './Coupons.css'
import { couponStore } from "../../../states/CouponState";

interface Props {
  coupons: couponModel[];
}


export default function Coupons(props: Props): JSX.Element {
  const coupons: couponModel[] = props.coupons;
  const [filteredCoupons, setFilteredCoupons] = useState<couponModel[]>(coupons);
 

  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    let filteredCoupons = coupons;

    if (selectedCategory) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.category.includes(selectedCategory));
    }

    if (maxPrice) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.price < maxPrice);
    }

    setFilteredCoupons(filteredCoupons);
  }, [coupons, selectedCategory, maxPrice]);

  const handleFilterByCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleFilterByMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
  };

  return (

    <div className="Coupons">
      {coupons.length ?

        <div className="couponsShowCase">


          <div className="filter">

            <select onChange={handleFilterByCategory}>
              <option value="">All</option>
              {couponStore.getState().categoryList.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>

            <input type="number" step={100} min={100} max={2000} placeholder='Filter by price' onChange={handleFilterByMaxPrice} />

          </div>

          {filteredCoupons.map((c) => (
            <CouponCard  key={c.id} coupon={c} />
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
