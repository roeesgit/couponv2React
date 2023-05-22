import axios from "axios";
import couponModel from "../models/couponModel";
import appConfig from "../config/Config";
import { addCoupon, couponStore, getCoupons } from "../states/CouponState";
import { authStore } from "../states/AuthState";
import categoryModel from "../models/categoryModel";
import categoryServiceObj from "./categoryService";






class couponService {


  async updatecoupon(coupon: couponModel, couponId: number) {
    await axios.post<couponModel>(appConfig.coupons + "/" + couponId, coupon,
      { headers: { Authorization: "Bearer " + authStore.getState().token } })
    couponStore.dispatch(addCoupon(coupon));
  }

  async addcoupon(coupon: couponModel): Promise<void> {
    await axios.post<couponModel>(appConfig.coupons, coupon,
      { headers: { Authorization: "Bearer " + authStore.getState().token } }
    )
    couponStore.dispatch(addCoupon(coupon));
  }

  async buyCoupon(coupon: couponModel): Promise<void> {
    await axios.post<couponModel>(appConfig.coupons + "/customer/buyCoupon", coupon, {
      headers: { Authorization: "Bearer " + authStore.getState().token, }
    });
    couponStore.dispatch(addCoupon(coupon));
  }


  async getinitialCoupons(): Promise<couponModel[]> {
    return await this.getAxiosCoupons(
      appConfig.coupons + "/all" )
  }
  async getCompanyCoupons(): Promise<couponModel[]> {
    return await this.getAxiosCoupons(
      appConfig.coupons + "/company")
  }
  async getCustomerCoupons(): Promise<couponModel[]> {
    return await this.getAxiosCoupons(
      appConfig.coupons + '/customer')
  }
  async getCouponsToPurchase(): Promise<couponModel[]> {
    //  const res = await this.getAxiosCoupons(appConfig.coupons+"/customer/validToBuy");
    //  return res;
    return await this.getAxiosCoupons(
      appConfig.coupons + "/customer/validToBuy");
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
