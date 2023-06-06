import { useNavigate, useParams } from 'react-router-dom';
import couponModel from '../../../models/couponModel';
import './CouponManipulate.css'
import { useState, useRef } from 'react';
import { couponStore } from '../../../states/CouponState';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../models/ErrorMessageModel';
import couponServiceObj from '../../../services/couponServic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';

export default function CouponManipulate(): JSX.Element {
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const couponId: number = +params.couponId!;
    const couponManipulated = useRef<couponModel>(
        couponStore.getState().couponList.filter(c => c.id === couponId)[0]);

    const today: Date = new Date();
    const startDateStartLimit: Date = new Date(today.setDate(today.getDate() + 1))
    const startDateStartLimitValue: string = startDateStartLimit.toISOString().split('T')[0];
    const startDateEndLimit: Date = new Date(today.setFullYear(today.getFullYear() + 1))
    const startDateEndLimitValue: string = startDateEndLimit.toISOString().split('T')[0];
    // const x : Date = startDateStartLimit
    const endtDateStartLimit = useRef<Date>(today);
    const endtDateStartLimitValue = useRef<string>();
    const endtDateendLimit = useRef<Date>(today);
    const endtDateEndLimitValue = useRef<string>();



    const setEndDate = (startDate: Date): boolean => {
        endtDateStartLimit.current.setDate(startDate.getDate() + 1);
        endtDateStartLimitValue.current = endtDateStartLimit.current.toISOString().split('T')[0];
        endtDateendLimit.current.setDate(endtDateStartLimit.current.setFullYear(today.getFullYear() + 2))
        endtDateEndLimitValue.current = endtDateendLimit.current.toISOString().split('T')[0];
        return true;
    }

    const schema = yup.object().shape({
        category: yup.string().required('Please select category')

        , title: yup.string()
            .required("Title name is required")
            .min(3, "This field must be at least 3 characters long")
            .max(20, "This field must be less than 20 characters long")
            .test("unique-title", "Title must be unique", function (value) {
                return !validUniqueField(value);
            })
        , description: yup.string()
            .required("Description name is required")
            .min(15, "This field must be at least 15 characters long")
            .max(100, "This field must be less than 100 characters long")

        , startDate: yup.date()
            .required("Start-date name is required")
            .min(startDateStartLimit, 'Start date must be after today')
            .max(startDateEndLimit, "Start date must be within one year")
        // .test("sss", function (value) {
        //    return setEndDate(value);
        // })
        , endDate: yup.date()
            .required("End-date name is required")
            .min(yup.ref('startDate'), 'End date must be after the start date')
            .test("is-after-start-date", "End date must be after the start date", function (value) {
                const startDate = this.resolve(yup.ref("startDate"));
                if (!startDate || !value) {
                    return true; // Skip validation if either start date or end date is not set
                }
                return new Date(value) > startDate;
            })
        // .min(endtDateStartLimit.current, 'Start date must be after today')
        // .max(endtDateEndLimitValue.current, "Start date must be within one year")

        , amount: yup.number()
            .required("Amount is required")
            .min(50, "This field must be higher than 50")
            .max(1000, "This field must be lower than 1000")
        , price: yup.number()
            .required("Price is required")
            .min(5, "This field must be higher than 5")
            .max(300, "This field must be lower than 300")
        , image: yup.string()
            .required("Image is required")
            .matches(
                /(http(s?):)([/|.|\w|\s|-])*\./,
                'Please enter a valid image URL'
            ),

    });
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<couponModel>({
        defaultValues: couponManipulated.current,
        mode: "all",
        resolver: yupResolver(schema),



    });
    const validUniqueField = (title: string) => {
        return couponStore.getState().couponList
            .filter((c) => couponId ? c.id != couponId : true)
            .map((c) => c.title)
            .includes(title);
    };

    const addcoupon = async (coupon: couponModel) => {
        setIsLoading(true);
        console.log("12  12  ", coupon);
        coupon.endDate = new Date(coupon.endDate);
        console.log(coupon.endDate);

        coupon.startDate = new Date(coupon.startDate)
        console.log(coupon.startDate);
        await couponServiceObj
            .addcoupon(coupon)
            .then((res) => {
                toast.success("Coupon added")
                setIsLoading(false);
                navi("/company/coupon/couponDetails/" + res.id);
            })
            .catch((e) => {
                setIsLoading(false);
                let error: ErrorMessage = e.response.data;
                toast.error(error.message);
            });
    };

    const updatecoupon = async (coupon: couponModel) => {
        console.log("couponId: ", couponId);

        setIsLoading(true);
        couponServiceObj.updatecoupon(coupon, couponId)
            .then(() => {
                toast.success("Update Sucsseful")
                setIsLoading(false);
                navi("/company");
            }).catch(e => {
                setIsLoading(false);
                let errorMessage: ErrorMessage = e.response.data;
                toast.error(errorMessage.message);
            })
    };

    function resetForm() {
        reset();
    }

    async function sendcoupon(coupon: couponModel): Promise<void> {
        console.log(2121, coupon);

        couponId ? await updatecoupon(coupon) : await addcoupon(coupon);
    }


    const exit = () => {
        couponId ?
            navi("/company/coupon/couponDetails/ " + couponId)
            :
            navi("/company")
    }



    console.log("endtDateStartLimitValue ", endtDateStartLimitValue.current);

    return (
        <div className="CouponManipulate">

            {isLoading ? (
                <Loader />
            ) : (
                <>
                 <div className="CustomerManipulate">
                    <div className="CustomerView">
                        <div className="contianer">
                            <div className="box1">
                                <button className="tugleOption">
                                    <div className="box">
                                        <div className="box">
                                            <div className="box">
                                                <div className="box">
                                                    <div className="last-box box">{couponId ? "Update " : "Add "} Coupon</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
               
                    <form className="couponForm" onSubmit={handleSubmit(sendcoupon)}>
                        <div className="fields">
                            <div className="innerField border">


                                <label htmlFor="title" >Title</label>
                                <input autoFocus type="text" placeholder="Title" {...register("title")} />
                                <span className={errors.title ? "inputError" : ""}>{errors.title?.message}</span>

                                <label htmlFor="description"  >Description</label>
                                <textarea placeholder="Description" className='description' {...register("description")} />
                                <span className={errors.description ? "inputError" : ""}>{errors.description?.message}</span>

                                <label htmlFor="category" >Category</label>
                                <select id="dropdown" {...register('category')} defaultValue="">
                                    <option value="">-- Select --</option>
                                    {couponStore.getState().categoryList.map(c =>
                                        (<option key={c.id} value={c.name}>{c.name}</option>)
                                    )}
                                </select>
                                <span className={errors.category ? "inputError" : ""}>{errors.category?.message}</span>

                                <label htmlFor="image" >Image</label>
                                <input type="url" placeholder="Image" {...register("image")} />
                                <span className={errors.image ? "inputError" : ""}>{errors.image?.message}</span>
                            </div>
                            <div className="innerField">
                                <label htmlFor="startDate" >Start-Date</label>
                                <input type="date" placeholder="start Date" min={startDateStartLimitValue} max={startDateEndLimitValue} {...register("startDate")} />
                                <span className={errors.startDate ? "inputError" : ""}>{errors.startDate?.message}</span>

                                <label htmlFor="endDate" >End-Date</label>
                                <input disabled={!watch("startDate")} type="date" placeholder="end Date" {...register("endDate")} />
                                <pre className={errors.endDate ? "inputError" : ""}> {errors.endDate?.message}</pre>

                                <label htmlFor="amount" >Amount</label>
                                <input type="number" step={1} min={50} placeholder="Amount" {...register("amount")} />
                                <span className={errors.amount ? "inputError" : ""}>{errors.amount?.message}</span>

                                <label htmlFor="price" >Price</label>
                                <input type="number" step={5} placeholder="Price" {...register("price")} />
                                <span className={errors.price ? "inputError" : ""}>{errors.price?.message}</span>



                            </div>
                        </div>
                        <div className="button">
                            <button onClick={exit}>Exit</button>
                            <button onClick={resetForm}>Reset Form</button>
                            <button disabled={Object.keys(errors).length != 0} type="submit">{couponId ? "Save" : "Add"} Coupon</button>
                        </div>
                    </form>

                </>
            )}









        </div>
    )
}