import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Customers.css";
import customerModel from "../../../models/customerModel";
import customerServiceObj from "../../../services/customerService";
import { NavLink, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import CustomerCard from "../customerCard/CustomerCard";
import { customerStore } from "../../../states/CustomerState";
import App from "../../Layout/Loading/App";
// import { useHistory  } from 'react-router-dom';
interface Props {
  customers: customerModel[];
}
export default function Customers(): JSX.Element {
  const [customers, setCustomers] = useState<customerModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<customerModel|null>(null);
  const navi = useNavigate();
  
  
  useEffect(() => {
    getCustomers();
  }, [selectedCustomer]);
  
  
  const getCustomers =  function () {
    setIsLoading(true);
    customerServiceObj.getAll().then((res)=>{
      setCustomers(res);
      setIsLoading(false);
    }).catch (e=>{
      setIsLoading(false);
      alert(e);
    }) 
  };
  
  const deleteCustomer = function (customerId : number){
      setIsLoading(true);
      customerServiceObj.deleteCustomerById(customerId).then(()=>{
        setIsLoading(false);
      }).catch(e=>{
        setIsLoading(false);
        alert(e)
      })
  }



  
  const handleEdit = (customer: customerModel) => {
    navi("customer/"+customer.id)
    // setSelectedCustomer(customer);
  };
  
  const handleDelete = (customer: customerModel) => {
    const userResponse = window.confirm("Are you sure?");
    if (userResponse){
      deleteCustomer(customer.id);
    }
    setSelectedCustomer(customer);
  }
  
  
  function filterByName(e: ChangeEvent<HTMLInputElement>) {
    e.target.value &&
      setCustomers(
        customerStore.getState().customerList.filter((d) => {

          return d.firstName.includes(e.target.value);
        })
      );
    e.target.value == "" && setCustomers(customerStore.getState().customerList);
  }
  
  return (
    <div className="Customers listContianer">
    {isLoading?
  <App/>
  :
  <>
      <div className="listErae">
          <div className="navLinkHolder">
        <NavLink to="customer" >
            <p className="addCustomerBtu">AddCustomer</p>
        </NavLink>
          </div>
        <div className="filers">
          <input
            type="text"
            placeholder="filter by name"
            onChange={filterByName}
            />
        </div>
        <div className="customersContianer listHolder">
          <ol className="customerOl">
            <div className="oLdetailsHeaders">
              <div className="oLdetailsHeadersPrincipal">
                <li>NAME</li>
                <li>EMAIL</li>
              </div>
              <div className="oLdetailsAction">
                <li> EDIT | DELETE </li>
              </div>
            </div>
            {customers.map((customer) => (
              <ul key={customer.id}>
                <li>
                  <button onClick={() => handleEdit(customer)} className="userCardBtu">

                  <div className="oLdetails">
                    <div className="oLdetailsfullName">{customer.firstName +" "+ customer.lastName}</div>
                    <div className="oLdetailsemail"> {customer.email}</div>
                  </div>
                    </button>
                  <div className="oLdetailsbtns">
                    <button
                      className="delete"
                      onClick={() => handleDelete(customer)}
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
