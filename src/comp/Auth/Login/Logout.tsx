import { useEffect } from 'react'
import './Logout.css'
import { clearCustomerStateAction, customerStore } from '../../../states/CustomerState'
import {clearCouponStateAction, couponStore } from '../../../states/CouponState'
import {clearCompanyStateAction, companyStore } from '../../../states/CompanyState'
import { authStore, logMeOut } from '../../../states/AuthState'
import { useNavigate } from 'react-router-dom'

export default function Logout() :JSX.Element{
    const navi = useNavigate();


    useEffect(()=>{

        customerStore.dispatch(clearCustomerStateAction())
        couponStore.dispatch(clearCouponStateAction())
        companyStore.dispatch(clearCompanyStateAction())
        authStore.dispatch(logMeOut())
        navi("/home")

    },[])

    return(

        <div className="Logout">


        </div>
    )
}