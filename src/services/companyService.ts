import axios from "axios";
import appConfig from "../config/Config";
import {
  AddAction,
  CompanyActionType,
  UpdateAction,
  companyStore,
  getAllAction,
} from "../states/CompanyState";
import { authStore } from "../states/AuthState";
import companyModel from "../models/companyModel";
import regCompanyModel from "../models/regCompanyModel";

class CompanyService {



  async addCompany(company: regCompanyModel): Promise<void> {
    const response = await axios.post<companyModel>(
      appConfig.companies,
      company,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    );
    companyStore.dispatch(AddAction(response.data));
  }

  async updateCompany(company: regCompanyModel, companyId: number): Promise<void> {

    await axios.put(
      appConfig.companies + "/" + companyId, company,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
    company.confirmPassword = "";
    company.password = "";
    companyStore.dispatch(UpdateAction(company));
  }

  async deleteCompanyById(companyId: number): Promise<void> {
    
    await axios.delete(appConfig.companies + "/" + companyId,
    { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
    companyStore.dispatch({
      type: CompanyActionType.DeleteCompany,
      payload: companyId
    });
    
  }
      
  async getAll(): Promise<companyModel[]> {
    if (companyStore.getState().companyList.length === 0) {
      console.log("companies from db");
      const response = await axios.get<companyModel[]>(appConfig.companies, {
        headers: { "Authorization": "Bearer " + authStore.getState().token },
      });
      companyStore.dispatch(getAllAction(response.data));
    } else {
      console.log("companies from state");
    }
    return companyStore.getState().companyList;
  }
    
  
  
  // getCompanyFromState(companyId: number): companyModel {
  //   const indexToFind = companyStore.getState().companyList.findIndex(c => c.id === companyId)
  //   return companyStore.getState().companyList[indexToFind];
  // }
  async getCompanyById(companyId: number): Promise<companyModel> {
    let company : companyModel;
    if (companyStore.getState().companyList.length === 0) {
      const response = await axios.get<companyModel>(
        appConfig.companies + "/" + companyId,
        { headers: { "Authorization": "Bearer " + authStore.getState().token } }
        )
        company = response.data;
      }
else{
  company = companyStore.getState().companyList
  .filter(c => c.id === companyId)[0];
}

      return company;
    }
    
  // async getCompanyByEmail(email: string): Promise<companyModel> {
    
    //   const res = await axios.get<companyModel>(appConfig.companies + "/company_name/" + email,
    //     { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    //   )
    //   return res.data;
    // }
  }
  
  const companyServiceObj = new CompanyService();
  
  export default companyServiceObj;
  