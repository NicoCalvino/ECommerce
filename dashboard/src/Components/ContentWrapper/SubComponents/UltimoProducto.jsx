import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'


function UltimoProducto() {
    const [productos, setDataProd] = useState({})

	useEffect(()=>{
		fetch("http://localhost:4000/api/products"
		).then(response => response.json()).then(data => {
            setDataProd(data.ultimoProd)
			})},[])

    return(
        <div className="col-lg-3 mb-4">
            <div className="card shadow mb-4 border-bottom-primary h-100">
                <div className="card-header py-3 ">
                    <h3 className="m-0 font-weight-bold text-gray-800">ÚLTIMO PRODUCTO CREADO</h3>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={ productos != {} && productos.picture} alt="Ultimo Prod" />
                    </div>
                    <h5 className="m-0 font-weight-bold text-gray-800">{ productos != {} && productos.name }</h5>
                    <Link className="btn btn-danger" to= {productos != {} &&  "/productos/" + productos.id} state= {productos != {} && productos.detail}>Ver Detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default UltimoProducto;