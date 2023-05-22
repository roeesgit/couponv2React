import { createStore } from "redux";
import couponModel from "../models/couponModel";
import { authStore } from "./AuthState";
import categoryModel from "../models/categoryModel";

export default class couponState{
    [x: string]: any;
    couponList:couponModel[]=[];
    categoryList : categoryModel[] =[];
}

export enum couponActionType {
    GetCategories,
    GetCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon
}

export interface couponAction{
    type:couponActionType
    payload: any
}

export function getCategoriesAction( categoryList : categoryModel[]):couponAction{
    return {type: couponActionType.GetCategories , payload:categoryList}
}

export function getCoupons(couponList:couponModel[]):couponAction{
    return {type: couponActionType.GetCoupons , payload:couponList}
}
export function addCoupon(coupon:couponModel):couponAction{
    return {type: couponActionType.AddCoupon , payload:coupon}
}
export function updateCoupon(coupon:couponModel):couponAction{
    return {type: couponActionType.UpdateCoupon , payload:coupon}
}
export function deleteCoupon(coupon:couponModel):couponAction{
    return {type: couponActionType.DeleteCoupon , payload:coupon}
}


export function couponReducer (currentState:couponState = new couponState, action : couponAction ):couponState{

    const newState = {...currentState};

    switch(action.type){

        case couponActionType.GetCategories:
            
            newState.categoryList = action.payload;
            break;
        case couponActionType.GetCoupons:
            newState.couponList = action.payload
            newState.couponList.map(c=>{
                c.endDate=new Date(c.endDate);
                c.startDate=new Date(c.startDate);
            })
            break;
            
            case couponActionType.AddCoupon:
            newState.couponList.push(action.payload)
            
            break;
            
            case couponActionType.UpdateCoupon:
                    const indexToUpdate = newState.couponList.findIndex(pro=> pro.id===action.payload)
                    newState.couponList[indexToUpdate] = action.payload;
            break;
            
            case couponActionType.DeleteCoupon:
                const indexToDelete = newState.couponList.findIndex(pro=> pro.id===action.payload)
                newState.couponList.splice(indexToDelete,1)
            break;
        
    }
    return newState;

}

export const couponStore = createStore(couponReducer);
