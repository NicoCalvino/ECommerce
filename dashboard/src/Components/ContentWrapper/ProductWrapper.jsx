import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function ProductWrapper(props) {
    return(
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
                <Header />
                
            </div>
            <Footer />
        </div>
    )
}

export default ProductWrapper;