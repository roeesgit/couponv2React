import { NavLink, useParams } from "react-router-dom";
import "./AdminView.css";
import { useEffect, useRef, useState } from "react";
import Companies from "../companiesManager/companies/Companies";
import Customers from "../customerManager/customers/Customers";
import ScrollToTop from "react-scroll-to-top";

export default function AdminView(): JSX.Element {

  const [isRender, setIsRender] = useState(false);
  const isCompany = useRef(false);
  const params = useParams();
  const isEmpty = useRef(true)


  useEffect(() => {
    if (params.renderId) {
      const renderId = +params.renderId
      isEmpty.current = renderId < 1 && renderId > 2;
      isCompany.current = renderId === 1;
      setIsRender(true)
    }
  }, [])


  const handleCompaniesClick = () => {
    setIsRender(!isRender);
    isCompany.current = true;
    isEmpty.current = false;
  };

  const handleCustomersClick = () => {
    setIsRender(!isRender);
    isCompany.current = false;
    isEmpty.current = false;
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

        {!isEmpty.current &&
          <>
          {

            isCompany.current ?
              <Companies />
              :
              <Customers />}
          </>
        }

      </div>
    </div>
  );
}
