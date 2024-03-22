import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import ScrollToTopOnRouteChange from "../Routing/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";
import "./Layout.css";


function Layout(): JSX.Element {

    return (
        
        <div className="Layout">

            <Navbar />

            <div className="mainContent">
                
                <ScrollToTopOnRouteChange />
                <Routing />
                
            </div>

            <Footer />

        </div>
    );
}

export default Layout;
