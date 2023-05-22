import App from "./Loading/App";
import Footer from "./LayoutArea/Footer/Footer";
import Header from "./LayoutArea/Header/Header";
import Routing from "./LayoutArea/Routing/Routing";
import './Layout.css'
import { authStore } from "../../states/AuthState";
import resUserModel from "../../models/resUserModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Layout(): JSX.Element {

  return (
    <div className="Layout">
      
      <header>
 
        <Header />
      </header>
      
        <main>
          <Routing />
    
        </main>
      <footer>
        <Footer />
      </footer>
      
    </div>
  );
}

