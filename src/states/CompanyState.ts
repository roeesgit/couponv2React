import { createStore, Store } from "redux";
import companyModel from "../models/companyModel";

export default class CompanyState {
    [x: string]: any;
    companyList: companyModel[] = [];
}

export enum CompanyActionType {
    FetchCompany,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    ClearState
}

export interface CompanyAction {
    type: CompanyActionType
    payload?: any
}

export function clearCompanyStateAction(): CompanyAction {
    return { type: CompanyActionType.ClearState }
}

export function getAllAction(companyList: companyModel[]): CompanyAction {
    return { type: CompanyActionType.FetchCompany, payload: companyList }
}

export function AddAction(company: companyModel): CompanyAction {
    return { type: CompanyActionType.AddCompany, payload: company }
}

export function UpdateAction(company: companyModel): CompanyAction {
    return { type: CompanyActionType.UpdateCompany, payload: company }
}

export function DeleteAction(companyId: number): CompanyAction {
    return { type: CompanyActionType.DeleteCompany, payload: companyId }
}


export function companyReducer(currentState: CompanyState = new CompanyState, action: CompanyAction): CompanyState {

    const newState = { ...currentState };
    switch (action.type) {

        case CompanyActionType.ClearState:
            newState.companyList = [];
            break;

        case CompanyActionType.FetchCompany:
            newState.companyList = action.payload;
            break;

        case CompanyActionType.AddCompany:
            newState.companyList.push(action.payload)
            break;

        case CompanyActionType.UpdateCompany:
            const indexToUpdate = newState.companyList.findIndex(c => c.id === action.payload.id)
            newState.companyList[indexToUpdate] = action.payload;
            break;

        case CompanyActionType.DeleteCompany:
            const indexToDelete = newState.companyList.findIndex(pro => pro.id === action.payload)
            newState.companyList.splice(indexToDelete, 1)
            break;

    }
    return newState;

}


export const companyStore = createStore(companyReducer);

