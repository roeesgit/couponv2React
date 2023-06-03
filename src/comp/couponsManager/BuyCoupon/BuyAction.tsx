import { useNavigate, useParams } from 'react-router-dom';
import './BuyAction.css'
import { useEffect, useRef, useState } from 'react';
import couponModel from '../../../models/couponModel';
import couponServiceObj from '../../../services/couponServic';
import { ErrorMessage } from '../../../models/ErrorMessageModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
export default function BuyAction(): JSX.Element {
    const param = useParams();
    const couponId: number = +param.couponId!
    const coupon = useRef<couponModel>();
    const [isLoading, setIsLoading] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        couponServiceObj.getCouponById(couponId).then((res) => {    
            coupon.current = res;
            setIsLoading(false);
        }
        ).catch((e) => {
            setIsLoading(false);
            const error: ErrorMessage = e.response.data;
            console.log(error.message);
            
            toast.error(error.message)
        });
    }, [])


    const handleBuyCoupon = () => {
        setIsLoading(true);
        couponServiceObj
            .buyCoupon(coupon.current!)
            .then(() => {
                toast.success("You now owen the coupon!")
                setIsLoading(false);
                // navi("/customer/coupon/couponDetails/" + coupon.current?.id);
                navi("/customer");
            })
            .catch((e) => {
                setIsLoading(false);
                const error: ErrorMessage = e.response.data;
                toast.error(error.message)
            });
    };
    const exit = () => {
        navi("/customer");
    }

    return (
        <>{isLoading ?
            <Loader />
            :
            <div className="BuyAction">

                    {/* <div className="details"> */}
                        <div className="head">

                            <h1>{coupon.current?.title}</h1>
                        </div>
                        <div className="body">
                            <div className="detailPic">
                                <img src={coupon.current?.image} alt="couponImg" />
                            </div>
                            <div className="bodyText">


                                <p>{coupon.current?.category}</p>
                                <p>{coupon.current?.description}</p>
                                <p> Expiration   {coupon.current?.endDate + ""}</p>
                                <div className="price">
                                    <p>Amount : {coupon.current?.amount}</p>
                                    <p>Price : $ {coupon.current?.price} </p>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <button onClick={handleBuyCoupon}>BUY</button>
                            <button onClick={exit}>Exit</button>
                        </div>
                    </div>
                // </div>
        }</>
    )
}