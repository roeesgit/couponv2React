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

class CompanyService {
async  getCompanyByEmail(email: string): Promise<companyModel> {

   const res = await axios.get<companyModel>(appConfig.companies+"/"+email,
    { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
return res.data;
}
  async deleteCompanyById(companyId: number): Promise<void> {

    await axios.delete<companyModel>(appConfig.companies + "/" + companyId,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
    companyStore.dispatch({
      type: CompanyActionType.DeleteCompany,
      payload: companyId
    });

  }
  async updateCompany(company: companyModel, companyId: number): Promise<void> {

    await axios.put<companyModel>(
      appConfig.companies + "/" + companyId, company,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
    companyStore.dispatch(UpdateAction(company));
  }

  async addCompany(company: companyModel): Promise<void> {
    const response = await axios.post<companyModel>(
      appConfig.companies,
      company,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    );
    companyStore.dispatch(AddAction(response.data));
  }


  async getCompanyById(companyId: number): Promise<companyModel> {
    const response = await axios.get<companyModel>(
      appConfig.companies + "/" + companyId,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    )
    return response.data;
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
}

const companyServiceObj = new CompanyService();

export default companyServiceObj;
