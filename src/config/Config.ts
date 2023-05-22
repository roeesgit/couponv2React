class Config {

}

class DevConfig extends Config {
  coupons: string =        "http://localhost:8080/api/v1/coupons";
  categories: string =        "http://localhost:8080/api/v1/categories";
  companies: string = "http://localhost:8080/api/v1/companies";
  customers: string = "http://localhost:8080/api/v1/customers";
  login: string = "http://localhost:8080/api/v1/auth/login";
}

class ProdConfig extends Config {
  coupons: string = "";
  categories: string = "";
  companies: string = "";
  customers: string = "";
  login: string = "";
}

const appConfig =
  process.env.NODE_ENV === "development" ? new DevConfig() : new ProdConfig();

export default appConfig;
