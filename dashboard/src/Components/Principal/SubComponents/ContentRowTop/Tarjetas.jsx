import React from "react";
import PropTypes from "prop-types";
import Estilos from "./Estilos.css"

function ContentRowTarjetas(props) {

    const { 
        title = "No Title",
        value = 0,
        color = "",
        icon = "",
        clase= ""
    } = props;

    return (

        <div className="col-md-2 mb-4">
            <div className={clase}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="font-weight-bold text-uppercase mb-1">{title}</div>
                            <div className="h5 mb-0 font-weight-bold">{value}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`${icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ContentRowTarjetas;
