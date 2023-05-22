import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerStore } from "../../../states/CustomerState";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import customerServiceObj from "../../../services/customerService";
import App from "../../Layout/Loading/App";
import regCustomerModel from "../../../models/regCustomerModel";
import customerModel from "../../../models/customerModel";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import "./CustomerManipulate.css";



export default function CustomerManipulate(): JSX.Element {

    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const customerId: number = +params.customerId!;

    let customerFromDB: regCustomerModel;
    const customerManipulated = useRef<customerModel>(
        customerId ? customerStore.getState().customerList.filter(c => c.id === customerId)[0] : customerFromDB!);


    const schema = yup.object().shape({
        firstName: yup.string()
            .required("First name is required")
            .min(3, "This field must be at least 3 characters long")
            .max(15, "This field must be less than 15 characters long")
        , lastName: yup.string()
            .required("Last name is required")
            .min(3, "This field must be at least 3 characters long")
            .max(15, "This field must be less than 15 characters long")

        , email: yup.string()
            .required("Email is required")
            .matches(/.+@+.+\..+/, "Please provide a valid email address")
            .min(3, "This field must be at least 3 characters long")
            .max(25, "This field must be less than 25 characters long")
            .test("unique-email", "Email must be unique", function (value) {
                return !validUniqueField(value);
            })
        , password: yup.string()
            .required("Password is required")
            .max(20, "This field must be less than 20 characters long")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
                "Password must contain at least one digit,\none lowercase letter, one uppercase letter, one special character, must not contain spaces, and must be at least 8 characters long")
        , confirmPassword: yup.string()
            .required("confirmation of password is important")
            .oneOf([yup.ref("password"), ""], "password doesn't match"),

    });

    const passwordErrorMessage =
        <div>
            <p> Password must contain at least one digit</p>
            <p> one lowercase letter, one uppercase letter</p>
            <p> one special character, must not contain spaces</p>
            <p> and must be at least 8 characters long</p>
        </div>;


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<regCustomerModel>({
        defaultValues: customerManipulated.current,
        mode: "all",
        resolver: yupResolver(schema),
    });

    const validUniqueField = (email: string) => {
        return customerStore.getState().customerList
            .filter((c) => customerId ? c.id != customerId : true)
            .map((c) => c.email)
            .includes(email);
    };

    const addCustomer = async (customer: regCustomerModel) => {
        setIsLoading(true);

        customerServiceObj
            .addCustomer(customer)
            .then(() => {
                setIsLoading(false);
                navi("/admin");
            })
            .catch((e) => {
                setIsLoading(false);
                let errorMessage: ErrorMessage = e.response.data;
                alert(errorMessage.message);
            });
    };

    const updateCustomer = async (customer: regCustomerModel) => {
        console.log("customerId: ", customerId);

        setIsLoading(true);
        customerServiceObj.updateCustomer(customer, customerId).then(() => {
            setIsLoading(false);
            navi("/admin");
        }).catch(e => {
            setIsLoading(false);
            let errorMessage: ErrorMessage = e.response.data;
            alert(errorMessage.message);
        })
    };

    function resetForm() {
        reset();
    }

    function sendCustomer(customer: regCustomerModel): void {
        customerId ? updateCustomer(customer) : addCustomer(customer);
    }


    return (
        <div className="CustomerManipulate">
            {isLoading ? (
                <App />
            ) : (
                <>
                    <h1>{customerId ? "Update " : "Add "} Customer</h1>
                    <form className="customerForm" onSubmit={handleSubmit(sendCustomer)}>
                        <div className="fields">

                            <label htmlFor="firstName" className="customerManipulate">First mame</label>
                            <input type="text" placeholder="First name" {...register("firstName")} />
                            <span className="inputError">{errors.firstName?.message}</span>

                            <label htmlFor="lastName" className="customerManipulate">Last name</label>
                            <input type="text" placeholder="Last name" {...register("lastName")} />
                            <span className="inputError">{errors.lastName?.message}</span>

                            <label htmlFor="email" className="customerManipulate">@ Email</label>
                            <input type="text" placeholder="Email" {...register("email")} />
                            <span className="inputError">{errors.email?.message}</span>

                            <label htmlFor="password" className="customerManipulate">Password</label>
                            <input type="text" placeholder="Password" {...register("password")} />
                            <span className="inputError"> {errors.password?.message && passwordErrorMessage}</span>

                            <label htmlFor="confirmPassword" className="customerManipulate">Confirm password</label>
                            <input type="text" placeholder="Confirm password" {...register("confirmPassword")} />
                            <span className="inputError">{errors.confirmPassword?.message}</span>

                        </div>
                        <div className="btu">
                            <button disabled={Object.keys(errors).length != 0} type="submit">{customerId ? "Save" : "Add"} customer</button>
                            <button onClick={resetForm}>Reset Form</button>
                        </div>
                    </form>
                </>
            )}

        </div>
    )


}