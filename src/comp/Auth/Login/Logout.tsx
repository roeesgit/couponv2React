import { useEffect } from 'react'
import './Logout.css'
import { clearCustomerStateAction, customerStore } from '../../../states/CustomerState'
import {clearCouponsStateAction, couponStore } from '../../../states/CouponState'
import {clearCompanyStateAction, companyStore } from '../../../states/CompanyState'
import { authStore, logOut } from '../../../states/AuthState'
import { useNavigate } from 'react-router-dom'
import authService from '../../../services/AuthService'
import authServiceObj from '../../../services/AuthService'

export default function Logout() :JSX.Element{
    const navi = useNavigate();


    useEffect(()=>{

        customerStore.dispatch(clearCustomerStateAction());
        couponStore.dispatch(clearCouponsStateAction());
        companyStore.dispatch(clearCompanyStateAction());
        authServiceObj.logout();
        navi("/home");

    },[])

    return(

        <div className="Logout"></div>
    )
}