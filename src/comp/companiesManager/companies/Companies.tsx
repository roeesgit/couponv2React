import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Companies.css";
import companyModel from "../../../models/companyModel";
import companyServiceObj from "../../../services/companyService";
import { NavLink, useNavigate } from "react-router-dom";
import { companyStore } from "../../../states/CompanyState";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import App from "../../Layout/Loading/App";

export default function Companies(): JSX.Element {
  const [companies, setCompanies] = useState<companyModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();
  
  useEffect(() => {
    getCompanies();
  }, []);
  
  const getCompanies = () => {
  
    setIsLoading(true);
    companyServiceObj.getAll().then((res)=>{
      setIsLoading(false);
      setCompanies(res);
    }
    ).catch((e)=>{
      setIsLoading(false);
      let errorMessage: ErrorMessage = e.response.data;
      alert(errorMessage.message);
      
    })
  };
  
  const handlecompanyDetails = (company: companyModel) => {
    console.log(1);
    
    navi("/admin/company/companyDetails/"+company.id)
  };
  
  const deleteCompany = async (companyId: number) => {
    try {
      setIsLoading(true);
      
      await companyServiceObj
      .deleteCompanyById(companyId)
      .then(() => console.log("company deleted"));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      alert("deleteCompany: "+ e);
    }
  };
  
  const handleDelete = async (company: companyModel) => {
    const userResponse = window.confirm("Are you sure?");
    if (userResponse) {
      await deleteCompany(company.id);
    } 
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
    
    
    return (
      <div className="Companies listContianer">
      {isLoading?
      <App/>
      :
      <>
      <div className="listErae">
          <div className="navLinkHolder ">
        <NavLink to="company">
            <p className="addCompanyBtu">AddCompany</p>
        </NavLink>
          </div>
        <div className="filers">
          <input
            type="text"
            placeholder="filter by name"
            onChange={filterByName}
            />
        </div>
        <div className="companiesContianer listHolder">
          <ol className="companyOl">
            <div className="oLdetailsHeaders">
              <div className="oLdetailsHeadersPrincipal">
                <li>NAME</li>
                <li>EMAIL</li>
              </div>
              <div className="oLdetailsAction">
                <li> EDIT | DELETE </li>
              </div>
            </div>
            {companies.map((company) => (
              <ul key={company.id}>
                <li>
                  <button
                    onClick={() => handlecompanyDetails(company)}
                    className="userCardBtu"
                    >
                    <div className="oLdetails">
                      <div className="oLdetailsfullName">{company.name}</div>
                      <div className="oLdetailsemail"> {company.email}</div>
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
      </div>
      </>}
    </div>
  );
}
