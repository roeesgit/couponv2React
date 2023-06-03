import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerModel from '../../../models/customerModel';
import './CustomerCard.css';
import { customerStore } from '../../../states/CustomerState';
import customerServiceObj from '../../../services/customerService';
import customerLogo from '../../../Assets/images/customer.jpg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';



export default function CustomerCard(): JSX.Element {
    const params = useParams();
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const customerId: number = +params.customerId!;
    const customer = useRef<customerModel>(
        customerStore.getState().customerList
            .filter(c => c.id === customerId)[0]
    );

    const handleEdit = () => {
        navi("/admin/customer/customerDetails/" + customerId)
    }
    const handleDelete = () => {
        toast.info(<div>
            <span>delete customer?</span>
            <button
                className="toastDeleteButton"
                onClick={() => deletecustomer(customerId)}>
                Delete
            </button>
        </div>,
            {
                position: "bottom-right",
                autoClose: 5000,
            }
        )
    }
    const handleExit = () => {
        navi("/admin/2")
    }

    const deletecustomer = (customerId: number) => {
        setIsLoading(true);
        customerServiceObj
            .deleteCustomerById(customerId)
            .then(() => {
                toast.success("customer deleted");
                setIsLoading(false);
                navi("/admin/2")
            })
            .catch((e) => {
                setIsLoading(false);
                toast.error("deletecustomer: " + e);
            })
    };
    return (
        <div className="CustomerCard">
            {isLoading ?
                <Loader />
                :
                <>
                    {customer.current &&

                        <button onClick={handleEdit} className="customerCardHolder" >

                            <div className="princials">

                                <h1>{customer.current.firstName} {customer.current.lastName}</h1>
                                <h2>{customer.current.email}</h2>
                            </div>
                            <div className="piHolder">
                                <img className="pic" src={customerLogo} alt="" />
                                <p>התמונה להמחשה בלבד 😉</p>
                            </div>

                        </button>
                    }
                    <div className="buttonNavigation">
                        <button onClick={handleEdit} className="editbutton">Edit</button>
                        <button onClick={handleDelete} className="deletebutton" >Delete</button>
                        <button onClick={handleExit} className="goBackbutton" >Exit</button>
                    </div>
                </>
            }


        </div>
    )

}