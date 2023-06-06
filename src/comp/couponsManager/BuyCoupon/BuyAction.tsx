import { useNavigate, useParams } from 'react-router-dom';
import './BuyAction.css'
import { useEffect, useRef, useState } from 'react';
import couponModel from '../../../models/couponModel';
import couponServiceObj from '../../../services/couponServic';
import { ErrorMessage } from '../../../models/ErrorMessageModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import { couponStore } from '../../../states/CouponState';
export default function BuyAction(): JSX.Element {
    const param = useParams();
    const couponId: number = +param.couponId!
    const coupon = useRef<couponModel>(couponStore.getState().couponList.filter(c => c.id === couponId)[0])
    const [isLoading, setIsLoading] = useState(false);
    const navi = useNavigate();
    const endDate: string = new Date(coupon.current?.endDate).toLocaleDateString();

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
                <div className="couponView">
                    <div className="contianer">
                        <div className="box1">
                            <button className="tugleOption">
                                <div className="box">
                                    <div className="box">
                                        <div className="box">
                                            <div className="box">
                                                <div className="last-box box">My Coupon</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>


                <div className={"detailContainer "}>
                    <div className="head">

                        <div className="detailPic">
                            <img src={coupon.current?.image} alt="couponImg" />
                        </div>
                        <div className="details">
                            <h2>{coupon.current?.title}</h2>
                            <p>{coupon.current?.category}</p>
                            <p>{coupon.current?.description}</p>
                            <p> "Expiration" : {endDate}</p>
                            <div className="price">
                                <p>Amount : {coupon.current?.amount}</p>
                                <p>Price : NIS {coupon.current?.price} </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="buttonsArea">
                    <button onClick={handleBuyCoupon} >Buy Now</button>
                </div>
            </div>
        }  </>
    );
}
