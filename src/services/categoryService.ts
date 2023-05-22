import axios from "axios";
import appConfig from "../config/Config";
import categoryModel from "../models/categoryModel";
import { authStore } from "../states/AuthState";
import { couponStore, getCategoriesAction } from "../states/CouponState";


class categoryService {

  async getCategories(): Promise<void> {
    if (couponStore.getState().categoryList.length === 0) {
      const res = await axios.get<categoryModel[]>(appConfig.categories,
        { headers: { Authorization: "Bearer " + authStore.getState().token } }
      );
      couponStore.dispatch(getCategoriesAction(res.data))
    }
  }

}

const categoryServiceObj = new categoryService();

export default categoryServiceObj;