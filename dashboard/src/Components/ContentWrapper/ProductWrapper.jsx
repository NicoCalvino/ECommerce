import React from "react";
import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
import DetalleProd from "../DetalleProd/DetalleProd"

function ProductWrapper(props) {
    return(
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
                <Topbar />
                <DetalleProd idProd={props.match.params.id}/>
            </div>
            <Footer />
        </div>
    )
}

export default ProductWrapper;