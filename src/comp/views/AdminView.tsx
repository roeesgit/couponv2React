import { NavLink } from "react-router-dom";
import "./AdminView.css";
import { useRef, useState } from "react";
import Companies from "../companiesManager/companies/Companies";
import Customers from "../customerManager/customers/Customers";

export default function AdminView(): JSX.Element {
  const [isRender, setIsRender] = useState(false);
  const isCompany = useRef(false);

  const handleCompaniesClick = () => {
    setIsRender(!isRender);
    isCompany.current = true;
  };
  const handleCustomersClick = () => {
    setIsRender(!isRender);
    isCompany.current = false;
  };

  return (
    <div className="AdminView">
      <div className="contianer">
        <div className="box1">
          <button className="tugleOption" onClick={handleCompaniesClick}>
            <div className="box">
              <div className="box">
                <div className="last-box box">Companies</div>
              </div>
            </div>
          </button>
        </div>

        <div className="box1">
          <button className="tugleOption" onClick={handleCustomersClick}>
            <div className="box">
              <div className="box">
                <div className="last-box box">Customers</div>
              </div>
            </div>
          </button>
        </div>
      </div>


      <div className="showCase">
        {isCompany.current ?
          <Companies />
          :
          <Customers />}

      </div>
    </div>
  );
}
