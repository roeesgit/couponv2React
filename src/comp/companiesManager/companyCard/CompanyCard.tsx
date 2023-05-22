import companyModel from "../../../models/companyModel";
import './CompanyCard.css'

export default function CompanyCard(prors: companyModel):JSX.Element{

    return (
        <div className="CompanyCard cardHolder">

            <p>{prors.name}</p>
            <p>{prors.email}</p>

        </div>
    )

}