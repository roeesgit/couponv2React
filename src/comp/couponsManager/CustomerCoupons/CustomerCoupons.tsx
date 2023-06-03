import { useState, useEffect } from 'react';
import couponModel from '../../../models/couponModel';
import couponServiceObj from '../../../services/couponServic';
import  './CustomerCoupons.css'
import Coupons from '../Coupons/Coupons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import { ErrorMessage } from '../../../models/ErrorMessageModel';

export default function CustomerCoupons():JSX.Element{
    const [customerCoupons, setCustomerCoupons] = useState<couponModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      
        couponServiceObj
          .getCustomerCoupons()
          .then((res) => {
            setCustomerCoupons(res);
              setIsLoading(false)
          })
          .catch((e) => {
            setIsLoading(false)
            const error : ErrorMessage = e.response.data
            toast.error("customerCoupons useEffect "+ error.message);
          });
      }, []);


    return(

        <div className="CustomerCoupons">
{isLoading? 
    <Loader/>  

    :
    <Coupons coupons={customerCoupons} />
    }


        </div>
    )
}