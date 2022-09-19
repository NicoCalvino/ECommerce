import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'


function UltimoProducto() {
    const [usuarios, setDataUser] = useState({})

    useEffect(()=>{
        fetch("http://localhost:4000/api/users"
        ).then(response => response.json()).then(data => {
            setDataUser(data.ultimoUsuario)
            })},[])

    return(
        <div className="col-lg-3 mb-4">
            <div className="card shadow mb-4 border-bottom-primary h-100">
                <div className="card-header py-3 ">
                    <h3 className="m-0 font-weight-bold text-gray-800">ÚLTIMO USUARIO REGISTRADO</h3>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={ usuarios != {} && usuarios.picture} alt="Ultimo Usuario" />
                    </div>
                    <h5 className="m-0 font-weight-bold text-gray-800">{ usuarios != {} && usuarios.name + " " + usuarios.lastName }</h5>
                    <Link className="btn btn-danger" to= {usuarios != {} && "/usuarios/" +  usuarios.id}>Ver Detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default UltimoProducto;