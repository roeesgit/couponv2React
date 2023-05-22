import { createStore, Store } from "redux";
import customerModel from "../models/customerModel";


export default class CustomerState{
    [x: string]: any;
    customerList:customerModel[]=[];

}



export enum CustomerActionType {
 
    FetchCustomers,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer,
    ClearState

}
export interface CustomerAction{
    type:CustomerActionType

    payload?: any
}

export function clearCustomerStateAction( ):CustomerAction{
    return {type: CustomerActionType.ClearState }
}
export function getFetchAction(customerList:customerModel[]):CustomerAction{
    return {type: CustomerActionType.FetchCustomers , payload:customerList}
}
export function getAddAction(customer:customerModel):CustomerAction{
    return {type: CustomerActionType.AddCustomer , payload:customer}
}
export function getUpdateAction(customer:customerModel,customerId : number):CustomerAction{
    return {type: CustomerActionType.UpdateCustomer , payload :{customer:customer,customerId:customerId}}
}
export function getDeleteAction(customerId:number):CustomerAction{
    return {type: CustomerActionType.DeleteCustomer , payload:customerId}
}


export function customerReducer (currentState:CustomerState = new CustomerState, action : CustomerAction ):CustomerState{

    const newState = {...currentState};

    switch(action.type){
        case CustomerActionType.ClearState:

        newState.customerList = [];
        break;
            
        case CustomerActionType.FetchCustomers:
            newState.customerList = action.payload;
            break;
            
            case CustomerActionType.AddCustomer:
            newState.customerList.push(action.payload)
            
            break;
            
            case CustomerActionType.UpdateCustomer:
            const indexToUpdate = newState.customerList.findIndex(pro=> pro.id===action.payload.customerId)
            
            newState.customerList[indexToUpdate] = action.payload.customer;
            break;
            
            case CustomerActionType.DeleteCustomer:
                const indexToDelete = newState.customerList.findIndex(pro=> pro.id===action.payload)
                newState.customerList.splice(indexToDelete,1)
            break;
        
    }
    return newState;

}


export const customerStore = createStore(customerReducer);

