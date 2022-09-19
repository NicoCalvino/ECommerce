import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DetalleUser from "./DetalleUser"

function UserWrapper(props) {
    return(
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
                <Header />
                <DetalleUser idUser={props.match.params.id}/>
            </div>
            <Footer />
        </div>
    )
}

export default UserWrapper;