import { useEffect, useState } from 'react';
import couponModel from '../../../models/couponModel';
import './CompanyCoupons.css'
import couponServiceObj from '../../../services/couponServic';
import App from '../../Layout/Loading/App';
import Coupons from '../Coupons/Coupons';

export default function CompanyCoupons():JSX.Element{
    const [companyCoupons, setcompanyCoupons] = useState<couponModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        couponServiceObj
          .getCompanyCoupons()
          .then((res) => {
            setcompanyCoupons(res);
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

    return(
        <div className="CompanyCoupons">

{isLoading? 
    <App/>  

    :
    <Coupons coupons={companyCoupons} />
    }
        </div>
        )
}