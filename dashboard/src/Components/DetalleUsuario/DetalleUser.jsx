import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function DetalleUser(props) {
    const id = props.match.params.id
    const [usuario, setDataUser] = useState({})

	useEffect(()=>{
		fetch("http://localhost:4000/api/users/" + id
		).then(response => response.json()).then(data => {
            setDataUser(data)         
			})},[])

    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">{ usuario != "" && usuario.nombre + " " + usuario.apellido }</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={  usuario != "" && usuario.imagen} alt=" Star Wars - Mandalorian " />
                    </div>
                    <Link className="btn btn-danger" to={usuario.eliminar}>Eliminar</Link>
                    <p>CATEGORIA: {  usuario != "" && usuario.categoria }</p>
                    <Link className="btn btn-danger" to="/">Volver</Link>
                </div>
            </div>
        </div>
    )
}

export default DetalleUser;