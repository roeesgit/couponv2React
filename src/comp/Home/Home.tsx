import { useState, useEffect } from "react";
import couponServiceObj from "../../services/couponServic";
import couponModel from "../../models/couponModel";
import Coupons from "../couponsManager/Coupons/Coupons";
import './Home.css'
import App from "../Layout/Loading/App";
interface Props{
  comp:JSX.Element
}
function Home(): JSX.Element {
  const [initialCoupons, setinitialCoupons] = useState<couponModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    couponServiceObj
      .getinitialCoupons()
      .then((res) => {
        setinitialCoupons(res);
        setTimeout(()=>{
          setIsLoading(false)
          
        },2000)
      })
      .catch((e) => {
        setIsLoading(false)
          
        alert("1 "+ e);
      });
    return () => {};
  }, []);

  return (
    <div className="Home">
      {isLoading? 
    <App/>  

    :
    <Coupons coupons={initialCoupons} />
    }
    </div>
  );
}

export default Home;
