import axios from "axios";
import appConfig from "../config/Config";
import {
  CustomerActionType,
  customerStore,
  getAddAction,
  getDeleteAction,
  getFetchAction,
  getUpdateAction,
} from "../states/CustomerState";
import { authStore } from "../states/AuthState";
import customerModel from "../models/customerModel";
import regCustomerModel from "../models/regCustomerModel";

class CustomerService {


  async addCustomer(customer: regCustomerModel): Promise<customerModel> {
    const response = await axios.post<customerModel>(
      appConfig.customers,
      customer,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    );
    customerStore.dispatch(getAddAction(response.data));
    return response.data;
  }
  
  async updateCustomer(customer: regCustomerModel, customerId: number): Promise<void> {
    const response = await axios.put<customerModel>(
      appConfig.customers + "/" + customerId,
      customer,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    );
    customer.password = "";
    customer.confirmPassword = "";
    customerStore.dispatch(getUpdateAction(response.data, customerId));
  }

  async deleteCustomerById(customerId: number): Promise<void> {
    await axios.delete(
      appConfig.customers + "/" + customerId,
      { headers: { "Authorization": "Bearer " + authStore.getState().token } }
    );
    customerStore.dispatch(getDeleteAction(customerId));
  }

  async getAll(): Promise<customerModel[]> {
    if (customerStore.getState().customerList.length === 0) {
      console.log("customers from db");
      console.log(2);
      
      const response = await axios.get<customerModel[]>(appConfig.customers, {
        headers: { "Authorization": "Bearer " + authStore.getState().token },
      });
      customerStore.dispatch(getFetchAction(response.data));
    } else {
      console.log("customers from state");
    }
    return customerStore.getState().customerList;
  }


  // async getCustomerByEmail(email: string): Promise<customerModel> {
  //   const res = await axios.get<customerModel>(appConfig.customers + "/" + email,
  //     { headers: { "Authorization": "Bearer " + authStore.getState().token } }
  //   )
  //   return res.data;
  // }
  // async getCustomerById(customerId: number): Promise<customerModel> {
  //   let customerToGet: customerModel;
  //   if (customerStore.getState().customerList.length === 0) {
  //     const response = await axios.get<customerModel>(
  //       appConfig.companies + "/" + customerId,
  //       { headers: { "Authorization": "Bearer " + authStore.getState().token } }
  //     )
  //     customerToGet = response.data;
  //   } else {
  //     const companyIndex: number = customerStore.getState().customerList.findIndex(c => c.id === customerId);

  //     customerToGet = customerStore.getState().customerList[companyIndex];
  //   }

  //   return customerToGet;
  // }

}

const customerServiceObj = new CustomerService();

export default customerServiceObj;
