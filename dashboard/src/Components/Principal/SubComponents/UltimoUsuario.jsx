import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Estilos from "./Estilos.css"


function UltimoProducto() {
    const [usuarios, setDataUser] = useState({})

    useEffect(()=>{
        fetch("http://localhost:4000/api/users"
        ).then(response => response.json()).then(data => {
            setDataUser(data.ultimoUsuario)
            })},[])

    return(
        <div className="col-lg-3 mb-4">
            <div className="card shadow mb-4 h-100">
                <div className="cabeceraDetalle">
                    <h3 className="m-0 font-weight-bold text-gray-800 tituloDetalle">ÚLTIMO USUARIO REGISTRADO</h3>
                </div>
                <div className="imagenDetalle">
                    <div className="text-center">
                        <img className="imagenProducto" src={ usuarios != {} && usuarios.picture} alt="Ultimo Usuario"  />
                    </div>
                </div>
                <div className="detalleProducto">
                    <h5 className="m-0 font-weight-bold text-gray-800">{ usuarios != {} && usuarios.name + " " + usuarios.lastName }</h5>
                </div>
                <div class="botonDetalle">
                    <Link className="btn btn-primary" to= {usuarios != {} && "/usuarios/" +  usuarios.id} >Ver Detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default UltimoProducto;