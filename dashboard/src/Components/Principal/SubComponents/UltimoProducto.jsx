import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Estilos from "./Estilos.css"


function UltimoProducto() {
    const [productos, setDataProd] = useState({})

	useEffect(()=>{
		fetch("http://localhost:4000/api/products"
		).then(response => response.json()).then(data => {
            setDataProd(data.ultimoProd)
			})},[])

    return(
        <div className="col-lg-3 mb-4">
            <div className="card shadow mb-4 h-100">
                <div className="cabeceraDetalle">
                    <h3 className="m-0 font-weight-bold text-gray-800 tituloDetalle">ÚLTIMO PRODUCTO CREADO</h3>
                </div>
                <div className="imagenDetalle">
                    <div className="text-center">
                        <img className="imagenProducto" src={ productos != {} && productos.picture} alt="Ultimo Prod" />
                    </div>
                </div>
                <div className="detalleProducto">
                    <h5 className="m-0 font-weight-bold text-gray-800">{ productos != {} && productos.name }</h5>
                </div>
                <div class="botonDetalle">
                    <Link className="btn btn-primary" to= {productos != {} &&  "/productos/" + productos.id} state= {productos != {} && productos.detail}>Ver Detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default UltimoProducto;