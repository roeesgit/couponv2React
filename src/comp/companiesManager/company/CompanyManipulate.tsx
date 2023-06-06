import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./CompanyManipulate.css";
import companyServiceObj from "../../../services/companyService";
import { useRef, useState } from "react";
import companyModel from "../../../models/companyModel";
import * as yup from "yup";
import { companyStore } from "../../../states/CompanyState";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../../models/ErrorMessageModel";
import regCompanyModel from "../../../models/regCompanyModel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";

export default function CompanyManipulate(): JSX.Element {

  const navi = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const companyId: number = +params.companyId!;
  const isUpdate = companyId ? true : false;

  const companyManipulated = useRef<companyModel>(
    companyStore.getState().companyList.filter(c => c.id === companyId)[0]);




  const schema = yup.object().shape({
    name: yup.string()
      .required("Name is required")
      .min(3, "This field must be at least 3 characters long")
      .max(15, "This field must be less than 15 characters long")
      .test("unique-name", "Name must be unique", function (value) {
        return !validUniqueField(value, true);
      })
      ,
    email: yup.string()
      .required("Email is required")
      .matches(/.+@+.+\..+/, "Please provide a valid email address")
      .min(3, "This field must be at least 3 characters long")
      .max(25, "This field must be less than 25 characters long")
      .test("unique-email", "Email must be unique", function (value) {
        return !validUniqueField(value, false);
      }),
    password: yup.string()
      .required("Password is required")
      .max(20, "This field must be less than 20 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, must not contain spaces, and must be at least 8 characters long")
    , confirmPassword: yup.string()
      .required("confirmation of password is important")
      .oneOf([yup.ref("password"), ""], "password doesn't match"),

  });

  const passwordErrorMessage =
  <div>
      <p> Password must contain at least one digit
      one lowercase letter, one uppercase letter
      one special character, must not contain spaces
      and must be at least 8 characters long.</p>
  </div>;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<regCompanyModel>({
    defaultValues: companyManipulated.current,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const validUniqueField = (name: string, isName: boolean) => {
    return companyStore.getState().companyList
      .filter((c) => companyId ? c.id != companyId : true)
      .map((c) => isName ? c.name : c.email)
      .includes(name);
  };


  const addCompany = async (company: regCompanyModel) => {
    setIsLoading(true);

    companyServiceObj
      .addCompany(company)
      .then(() => {
        toast.success(company.name +' is now a new partner!');

        setIsLoading(false);
        navi("/admin/1");
      })
      .catch((e) => {
        setIsLoading(false);
        const errorMessage: ErrorMessage = e.response.data;
        toast.error('Add company: ' + errorMessage.message);
      });
  };

  const updateCompany = async (company: regCompanyModel) => {
    setIsLoading(true);
    companyServiceObj.updateCompany(company, companyId).then(() => {
      toast.success(company.name + " Updated")
      setIsLoading(false);
      navi("/admin/company/" + companyId);
    }).catch(e => {
      setIsLoading(false);
      const er: ErrorMessage = e.response.data;
      toast.error(er.message);
    })
  };

  function resetForm() {
    reset();
  }

  function sendCompany(company: regCompanyModel): void {
    isUpdate ? updateCompany(company) : addCompany(company);
  }

  const exit = () => {
    isUpdate ?
      navi("/admin/company/" + companyId)
      :
      navi("/admin/1")
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="CompanyManipulate">
          <div className="header">
            <h1>{companyId ? "Update " : "Add "} Company</h1>
          </div>
          <form className="companyForm" onSubmit={handleSubmit(sendCompany)}>
            <div className="fields">

              <label htmlFor="name" className="companyManipulate">Name </label>
              {isUpdate && <p>*cannot be updated</p>}
              <input type="text" placeholder="Name" {...register("name")} formNoValidate readOnly={isUpdate} />
              <span className="inputError">{errors.name?.message}</span>

              <label htmlFor="email" className="companyManipulate">@Email</label>
              <input type="text" placeholder="Email" {...register("email")} />
              <span className="inputError">{errors.email?.message}</span>

              <label htmlFor="password" className="companyManipulate">Password</label>
              <input type="password" placeholder="Password" {...register("password")} />
              <span className="inputError">{errors.password?.message && passwordErrorMessage}</span>

              <label htmlFor="confirmPassword" className="companyManipulate">Confirm password</label>
              <input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
              <span className="inputError">{errors.confirmPassword?.message}</span>

            </div>

            <div className="button">
              <button disabled={Object.keys(errors).length !== 0} type="submit">{companyId ? "Save" : "Add"}</button>
              <button onClick={resetForm}>Reset Form</button>
              <button onClick={exit}>Exit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
