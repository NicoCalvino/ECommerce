import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DetalleProd from "./DetalleProd"

function ProductWrapper(props) {
    return(
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
                <Header />
                <DetalleProd idProd={props.match.params.id}/>
            </div>
            <Footer />
        </div>
    )
}

export default ProductWrapper;