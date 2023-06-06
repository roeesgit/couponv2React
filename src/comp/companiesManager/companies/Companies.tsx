import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Companies.css";
import companyModel from "../../../models/companyModel";
import companyServiceObj from "../../../services/companyService";
import { NavLink, useNavigate } from "react-router-dom";
import { companyStore } from "../../../states/CompanyState";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";
import { FcInfo } from 'react-icons/fc'

export default function Companies(): JSX.Element {
  const [companies, setCompanies] = useState<companyModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {

    setIsLoading(true);
    companyServiceObj.getAll().then((res) => {
      setIsLoading(false);
      setCompanies(res);
    }
    ).catch((e) => {
      setIsLoading(false);
      let errorMessage: ErrorMessage = e.response.data;
      toast.error(errorMessage.message);
    })
  };

  const handlecompanyDetails = (company: companyModel) => {
    console.log(1);

    navi("/admin/company/" + company.id)
  };

  const deleteCompany = (companyId: number) => {
    setIsLoading(true);
    companyServiceObj
      .deleteCompanyById(companyId)
      .then(() => {
        toast.success('Company whit ID: ' + companyId + ' deleted');
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        let error: ErrorMessage = e.response.data;
        toast.error(error.message);
      })
  };


  const handleDelete = async (company: companyModel) => {
    toast.info(
      <div>
        <span>delete company?</span>
        <button
          className="toastDeleteButton"
          onClick={() => deleteCompany(company.id)}>
          Delete
        </button>
      </div>,
      {
        position: "bottom-right",
        autoClose: 10000,
      }
    )
  };

  function filterByName(e: ChangeEvent<HTMLInputElement>) {
    e.target.value &&
      setCompanies(
        companyStore.getState().companyList.filter((d) => {
          return d.name.includes(e.target.value);
        })
      );
    e.target.value == "" && setCompanies(companyStore.getState().companyList);
  }
  const handleAddCompany = () => {
    navi('/admin/customer/customerDetails')
  }

  return (
    <div className="Companies listContianer">
      {isLoading ?
        <Loader />
        :
        <>
          <div className="listArea">
            <div className="filers">
              <h3>Start entering text to filter the list: </h3>

              <input
                type="text"
                onChange={filterByName}
              />
            </div>
            {companies.length > 0 ?
              <div className="companiesContianer listHolder">
                <ol className="companyOl">
                  <div className="oLdetailsHeaders">
                    <div className="oLdetailsHeadersPrincipal">

                      <div className="page-help">

                        <FcInfo className="info-icon" />
                        <p>
                          Click a customers name to update or delete a customers info.
                        </p>
                      </div>
                      <div className="princpals">


                        <li>NAME</li>
                        <li>EMAIL</li>
                      </div>
                    </div>
                    <div className="oLdetailsAction">
                    <button className="addCompany" onClick={handleAddCompany}>Add Company</button>

                    </div>
                  </div>
                  {companies.map((company) => (
                    <ul key={company.id}>
                      <li>
                        <button
                          onClick={() => handlecompanyDetails(company)}
                          className="userCardbutton"
                        >
                          <div className="oLdetails">
                            <p className="oLdetailsfullName">{company.name}</p>
                            <p className="oLdetailsemail"> {company.email}</p>
                          </div>
                        </button>

                        <div className="oLdetailsbtns">
                          <button
                            className="delete"
                            onClick={() => handleDelete(company)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    </ul>
                  ))}
                </ol>
              </div>
              :
              <div className="emptyList">
                <h1>No companies... </h1>
              </div>
            }
          </div>
        </>}
    </div>
  );
}
