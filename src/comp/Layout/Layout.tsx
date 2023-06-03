import Footer from "./LayoutArea/Footer/Footer";
import Header from "./LayoutArea/Header/Header";
import Routing from "./LayoutArea/Routing/Routing";
import './Layout.css'
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

