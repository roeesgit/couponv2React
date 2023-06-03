import { ChangeEvent, useEffect, useState } from 'react';
import couponModel from '../../../models/couponModel';
import couponServiceObj from '../../../services/couponServic';
import Coupons from '../Coupons/Coupons';
import { ErrorMessage } from '../../../models/ErrorMessageModel';
import './CompanyCoupons.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';

export default function CompanyCoupons(): JSX.Element {
  const [companyCoupons, setcompanyCoupons] = useState<couponModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    couponServiceObj
      .getCompanyCoupons()
      .then((res) => {
        setcompanyCoupons(res);
        setIsLoading(false)
      })
      .catch((e) => {
        const error: ErrorMessage = e.response;

        setIsLoading(false)
        toast.error("CompanyCoupons useEffect " + e);
      });
    return () => { };
  }, []);


 
  return (
    <>
      {isLoading ?
        <Loader />

        :
        <div className="CompanyCoupons">
      
          <Coupons coupons={companyCoupons} />
        </div>
      }
    </>
  )
}