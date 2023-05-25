import { useState } from "react";
import customerModel from "../../../models/customerModel";
import userModel from "../../../models/userModel";
import './CustomerCard.css';

export default function CustomerCard():JSX.Element{
   
    return (
        <div className="CustomerCard cardHolder">
        <div className="detailWraper">
        
            {/* <p>{customer.firstName +" "+customer.lastName}</p>
            <p>{customer.email}</p> */}

          </div>
        </div>
    )

}