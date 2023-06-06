import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Customers.css";
import customerModel from "../../../models/customerModel";
import customerServiceObj from "../../../services/customerService";
import { NavLink, useNavigate } from "react-router-dom";
import { customerStore } from "../../../states/CustomerState";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";
import { FcInfo } from 'react-icons/fc'

export default function Customers(): JSX.Element {
  const [customers, setCustomers] = useState<customerModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    getCustomers();
  }, []);


  const getCustomers = () => {
    setIsLoading(true);
    customerServiceObj.getAll().then((res) => {
      setCustomers(res);
      setIsLoading(false);
    }).catch(e => {
      console.log(1);
      let errorMessage: ErrorMessage = e;
      toast.error(errorMessage.message);
      setIsLoading(false);

    })
  };


  const handlecustomerDetails = (customer: customerModel) => {
    navi("/admin/customer/" + customer.id)
  };

  const deleteCustomer = (customerId: number) => {
    setIsLoading(true);
    customerServiceObj
      .deleteCustomerById(customerId)
      .then(() => {
        toast.success("customer ID:" + customerId + " deleted");
        setIsLoading(false);
      }).catch(e => {
        setIsLoading(false);
        let errorMessage: ErrorMessage = e.response.data;
        toast.error("deleteCustomer: " + errorMessage.message);
      })
  }




  // const handleEdit =  (customer: customerModel) => {
  //   navi("/admin/customer/" + customer.id)
  //   // setSelectedCustomer(customer);
  // };

  const handleDelete = (customer: customerModel) => {
    toast.info(<div className="MyToastDelete">
      <span>delete customer?</span>
      <button
        className="toastDeleteButton"
        onClick={() => deleteCustomer(customer.id)}
      >
        Delete
      </button>
    </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
      }
    )
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

  const handleAddCustomer = () => {
    navi('/admin/customer/customerDetails')
  }
  return (
    <div className="Customers listContianer">
      {isLoading ?
        <Loader />
        :

        <div className="listArea">
          <div className="filers">
            <h3>Start entering text to filter the list: </h3>
            <input
              type="text"
              onChange={filterByName}
            />
          </div>
          {customers.length > 0 ?

            <div className="customersContianer listHolder">
              <ol className="customerOl">
                <div className="oLdetailsHeaders">
                  <div className="oLdetailsHeadersPrincipal">

                    <div className="page-help">

                      <FcInfo className="info-icon" />
                      <p>
                        Click a customers name to update or delete a customers info.
                      </p>
                    </div>

                    <div className="princpals">

                      <li>Name</li>
                      <li>Email</li>
                    </div>
                  </div>
                  <div className="oLdetailsAction">
                    <button className="addCustomer" onClick={handleAddCustomer}>Add Customer</button>
                  </div>
                </div>
                {customers.map((customer) => (
                  <ul key={customer.id}>
                    <li>
                      <button onClick={() => handlecustomerDetails(customer)} className="userCardbutton">

                        <div className="oLdetails">
                          <div className="oLdetailsfullName">{customer.firstName + " " + customer.lastName}</div>
                          <div className="oLdetailsemail"> {customer.email}</div>
                        </div>
                      </button>
                      <div className="oLdetailsbtns">
                        <button className="delete" onClick={() => handleDelete(customer)}>
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
              <h1>No customers... </h1>
            </div>
          }
        </div>

      }
    </div>
  );
}
