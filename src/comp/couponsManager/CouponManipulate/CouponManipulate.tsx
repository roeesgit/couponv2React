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
import App from '../../Layout/Loading/App';

export default function CouponManipulate(): JSX.Element {
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const couponId: number = +params.couponId!;
    let couponFromDB: couponModel;
    const couponManipulated = useRef<couponModel>(
        couponId ? couponStore.getState().couponList.filter(c => c.id === couponId)[0] : couponFromDB!);



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
            .min(new Date(), 'Start date must be after today')

        , endDate: yup.date()
            .required("End-date name is required")
            .min(yup.ref('startDate'), 'End date must be after the start date')

        , amount: yup.number()
            .required("Amount is required")
            .min(100, "This field must be heigher then 100")
            .max(2000, "This field must be lower than 1000")
        , price: yup.number()
            .required("Price is required")
            .min(100, "This field must be heigher then 100")
            .max(2000, "This field must be lower than 2000")
        , image: yup.string()
            .required("Image is required")
            .matches(
                /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
                'Please enter a valid image URL'
            ),

    });
    const {
        register,
        handleSubmit,
        reset,
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

      await couponServiceObj
            .addcoupon(coupon)
            .then(() => {
                setIsLoading(false);
                navi("/company");
            })
            .catch((e) => {
                setIsLoading(false);
                let errorMessage: ErrorMessage = e.response.data;
                alert(errorMessage.message);
            });
    };

    const updatecoupon = async (coupon: couponModel) => {
        console.log("couponId: ", couponId);

        setIsLoading(true);
        couponServiceObj.updatecoupon(coupon, couponId).then(() => {
            setIsLoading(false);
            navi("company");
// .. לחזור לקופונים  
      }).catch(e => {
            setIsLoading(false);
            let errorMessage: ErrorMessage = e.response.data;
            alert(errorMessage.message);
        })
    };

    function resetForm() {
        reset();
    }

   async function sendcoupon(coupon: couponModel):Promise<void> {
        couponId ?await updatecoupon(coupon) :await addcoupon(coupon);
    }
    
    
    const today: Date = new Date();
    const startDateLimit : string = today.toISOString().split('T')[0];
    console.log("1: ",today);
    today.setFullYear(today.getFullYear()+3);
    const endtDateLimit : string = today.toISOString().split('T')[0];
   console.log("2zzzzzz: ",couponStore.getState().categoryList);
    
    return (
        <div className="CouponManipulate">

            {isLoading ? (
                <App />
            ) : (
                <>
                    <h1>{couponId ? "Update " : "Add "} Coupon</h1>
                    <form className="couponForm" onSubmit={handleSubmit(sendcoupon)}>
                        <div className="fields">
                        <div className="innerField border">

                            <label htmlFor="category" >Category</label>
                            <select id="dropdown" {...register('category')} defaultValue="">
                                <option value="">-- Select --</option>
                                {couponStore.getState().categoryList.map(c=>
                           (  <option key={c.id} value={c.name}>{c.name}</option>)
                                    )}
                            </select>
                            <span className="inputError">{errors.category?.message}</span>

                            <label htmlFor="title" >Title</label>
                            <input type="text" placeholder="Title" {...register("title")} />
                            <span className="inputError">{errors.title?.message}</span>

                            <label htmlFor="description"  >Description</label>
                            <textarea  placeholder="Description" className='description' {...register("description")} />
                            <span className="inputError">{errors.description?.message}</span>

                            <label htmlFor="image" >Image</label>
                            <input type="text" placeholder="Image" {...register("image")} />
                            <span className="inputError">{errors.image?.message}</span>
                            </div>
                        <div className="innerField">
                            <label htmlFor="startDate" >Start-Date</label>
                            <input type="date" placeholder="start Date" min={startDateLimit} {...register("startDate")} />
                            <span className="inputError">{errors.startDate?.message}</span>

                            <label htmlFor="endDate" >End-Date</label>
                            <input type="date" placeholder="end Date" max={endtDateLimit} {...register("endDate")} />
                            <span className="inputError"> {errors.endDate?.message}</span>

                            <label htmlFor="amount" >Amount</label>
                            <input type="text" placeholder="Amount" {...register("amount")} />
                            <span className="inputError">{errors.amount?.message}</span>

                            <label htmlFor="price" >Price</label>
                            <input type="text" placeholder="Price" {...register("price")} />
                            <span className="inputError">{errors.price?.message}</span>



                        </div>
                        </div>
                        <div className="btu">
                            <button disabled={Object.keys(errors).length != 0} type="submit">{couponId ? "Save" : "Add"} Coupon</button>
                            <button onClick={resetForm}>Reset Form</button>
                        </div>
                    </form>
                </>
            )}









        </div>
    )
}