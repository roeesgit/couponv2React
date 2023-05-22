import "./PageNotFound.css";
import pageNotFound from '../../../Assets/images/pagenotfound.jpg'
function PageNotFound(): JSX.Element {

    return(
        <div className="PageNotFound">
            {/* <h1>Sorry</h1>
            <h2>We could not find the page requested </h2> */}
            <div className="imgContianer">
            <img src={pageNotFound} alt="Page not found" />
            </div>
        </div>
    )   

}       

export default PageNotFound;
