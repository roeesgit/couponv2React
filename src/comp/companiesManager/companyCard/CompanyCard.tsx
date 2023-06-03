import { useNavigate, useParams } from "react-router-dom";
import companyModel from "../../../models/companyModel";
import { useRef, useState } from "react";
import { companyStore } from "../../../states/CompanyState";
import companyServiceObj from "../../../services/companyService";
import companyLogo from '../../../Assets/images/R.png'
import './CompanyCard.css'
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";
export default function CompanyCard(): JSX.Element {
    const params = useParams();
    const navi = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const companyId: number = +params.companyId!;
    const company = useRef<companyModel>(
        companyStore.getState().companyList
            .filter(c => c.id === companyId)[0]
    );

    const handleEdit = () => {
        navi("/admin/company/companyDetails/" + companyId)
    }
    const handleDelete = () => {
        toast.info(<div>
            <span>delete company?</span>
            <button
                className="toastDeleteButton"
                onClick={() => deleteCompany(companyId)}>
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
        navi("/admin/1")
    }

    const deleteCompany = (companyId: number) => {
        setIsLoading(true);
        companyServiceObj
            .deleteCompanyById(companyId)
            .then(() => {
                toast.success("company with ID: " + companyId + " deleted");
                setIsLoading(false);
                navi("/admin/1")
            })
            .catch((e) => {
                setIsLoading(false);
                let error: ErrorMessage = e.response.data;

                toast.error(error.message);
            })
    };
    return (
        <div className="CompanyCard">
            {isLoading ?
                <Loader />
                :
                <>
                    {company.current &&
                        <button onClick={handleEdit} className="companyCardHolder" >

                            <div className="princials">

                                <h1>{company.current.name}</h1>
                                <h2>{company.current.email}</h2>
                            </div>
                            <div className="piHolder">
                                <img className="pic" src={companyLogo} alt="" />
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