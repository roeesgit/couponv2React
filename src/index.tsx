import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Layout from "./comp/Layout/Layout";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
  <BrowserRouter>
  <ToastContainer />
    <Layout />
  <ScrollToTop smooth
  className="scrollUp"
  style={{
    borderRadius: '100%',
    background: 'var(--color-gold-neon)',
    boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.54)',
    color: 'blue'
  }}/>
  </BrowserRouter>
   </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
