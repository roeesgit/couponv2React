import "./PageNotFound.css";
import pageNotFound from '../../../Assets/images/coupon4you404.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../../../Assets/images/logo-img.png'
import gpt from '../../../Assets/images/SupportPage.png'
function PageNotFound(): JSX.Element {
const navi = useNavigate();
const [isSuport , setIsSupport] = useState(false);

const handleNaviToHome=()=>{

    navi('/home')
}
const handleNaviToHelp=()=>{

    navi('/help')
}
const handlesupportPopUp=()=>{
setIsSupport(!isSuport)
  
}
return(
        <div className="PageNotFound">
            <img src={pageNotFound} alt="Page not found" />
            <div className="buttonsArea">
                <button onClick={handleNaviToHelp} ></button>
                <button onClick={handlesupportPopUp} ></button>
                <button onClick={handleNaviToHome} ></button>
            </div>
            {isSuport&& <div className="supportMessage">
                
                
                {/* <div className="imgHolder"> */}
                 <img className="logo" src={logo} alt="logo" />

                {/* </div> */}
            {/* <div className="supportText"> */}

                 <img className="gpt" src={gpt} alt="logo" />

            {/* </div> */}
            
            </div> }
        </div>
    )   

}       

export default PageNotFound;
