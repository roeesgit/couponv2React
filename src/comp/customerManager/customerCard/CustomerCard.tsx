import { useState } from "react";
import customerModel from "../../../models/customerModel";
import userModel from "../../../models/userModel";
import './CustomerCard.css';
interface Props{
  customer: customerModel;
}
export default function CustomerCard(props: Props):JSX.Element{
    const customer: customerModel = props.customer;
   
    return (
        <div className="CustomerCard cardHolder">
        <div className="detailWraper">
        
            <p>{customer.firstName +" "+customer.lastName}</p>
            <p>{customer.email}</p>

          </div>
        </div>
    )

}