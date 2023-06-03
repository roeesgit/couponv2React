import axios from "axios";
import couponModel from "../models/couponModel";
import appConfig from "../config/Config";
import { addCoupon, couponStore, deleteCoupon, getCoupons, updateCoupon } from "../states/CouponState";
import { authStore } from "../states/AuthState";
import categoryServiceObj from "./categoryService";






class couponService {



  async addcoupon(coupon: couponModel): Promise<couponModel> {
    const res = await axios.post<couponModel>(appConfig.coupons, coupon,
      { headers: { Authorization: "Bearer " + authStore.getState().token } }
    )
    couponStore.dispatch(addCoupon(res.data));
    return res.data;
  }


  async updatecoupon(coupon: couponModel, couponId: number) {

    await axios.put<couponModel>(appConfig.coupons + "/" + couponId, coupon,
      { headers: { Authorization: "Bearer " + authStore.getState().token } })
    couponStore.dispatch(updateCoupon(coupon));
  }


  async deleteCouponById(id: number): Promise<void> {
    await axios.delete(appConfig.coupons + "/" + id,
      { headers: { Authorization: "Bearer " + authStore.getState().token } });
    couponStore.dispatch(deleteCoupon(id))
  }


  async getCouponById(id: number) : Promise<couponModel> {
    const res = await axios.get(appConfig.coupons + "/customer/" + id,
      { headers: { Authorization: "Bearer " + authStore.getState().token } });
    return res.data;
  }


  async buyCoupon(coupon: couponModel): Promise<void> {
    await axios.post(appConfig.coupons + "/customer/buyCoupon", coupon, {
      headers: { Authorization: "Bearer " + authStore.getState().token, }
    });
    console.log(1);
    console.log(couponStore.getState().couponList);
    
    couponStore.dispatch(addCoupon(coupon));
  }


  async getinitialCoupons(): Promise<couponModel[]> {
    const res = await axios.get<couponModel[]>(appConfig.coupons + "/all")
    return res.data;
  }


  async getCompanyCoupons(): Promise<couponModel[]> {
    return await this.getAxiosCoupons(
      appConfig.coupons + "/company")
  }


  async getCustomerCoupons(): Promise<couponModel[]> {
    return await this.getAxiosCoupons(
      appConfig.coupons + "/customer");
  }


  async getCouponsToPurchase(): Promise<couponModel[]> {
    const res = await axios.get<couponModel[]>(appConfig.coupons + "/customer/validToBuy",
      { headers: { Authorization: "Bearer " + authStore.getState().token } });
    await categoryServiceObj.getCategories();
    return res.data;
  }



  async getAxiosCoupons(apiAdress: string): Promise<couponModel[]> {
    if (couponStore.getState().couponList.length === 0) {
      const res = await axios.get<couponModel[]>(apiAdress,
        { headers: { Authorization: "Bearer " + authStore.getState().token } });
      await categoryServiceObj.getCategories();

      couponStore.dispatch(getCoupons(res.data));
    }
    return couponStore.getState().couponList;

  }



}


const couponServiceObj = new couponService();
export default couponServiceObj;
