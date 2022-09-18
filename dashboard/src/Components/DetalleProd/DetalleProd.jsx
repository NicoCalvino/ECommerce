import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function DetalleProducto(props) {
    const id = Number(props.idProd)
    const [producto, setDataProd] = useState({})
    const [tamanos, setTamanos] = useState({})
    const [colores, setColores] = useState({})
    const [caracteristicas, setCaract] = useState({})

	useEffect(()=>{
		fetch("http://localhost:4000/api/products/" + id
		).then(response => response.json()).then(data => {
            setDataProd(data)         
            setTamanos(data.tamanos)         
            setColores(data.colores)         
            setCaract(data.description.split("|"))   
			})},[])

    return(
        <div className="col-lg-6 mb-4">
            <h1 className="m-0 font-weight-bold text-gray-800">{ producto != "" && producto.name } - { producto != "" && producto.marca }</h1>
            <div className="card shadow mb-4">
                <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={  producto != "" && producto.imagen} alt=" Star Wars - Mandalorian " />
                </div>
            </div>
            <a className="btn btn-primary" href={producto.detalleBicipal}>BICIPAL VENTA</a>
            <a className="btn btn-success" href={producto.edicionBicipal}>BICIPAL EDICION</a>
            <h5>ESTADO: {producto != "" && producto.estado}</h5>
            <h4>CARACTERISTICAS</h4>
            {caracteristicas.length == 0 && <p>Cargando...</p>}
            {caracteristicas.length > 0 && caracteristicas.map(caract => <p>{caract}</p>)}
            <h4>TAMAÑOS</h4>
            {tamanos.length == 0 && <p>Cargando...</p>}
            {tamanos.length > 0 && tamanos.map(tamano => <p>{tamano}</p>)}
            <h4>COLORES</h4>
            {colores.length == 0 && <p>Cargando...</p>}
            {colores.length > 0 && colores.map(color => <p>{color}</p>)}

            <Link className="btn btn-danger" to="/">Volver</Link>
            <form action={producto.eliminar} class="boton-eliminar" method="POST">
                <button type="submit" class="btn btn-danger">ELIMINAR</button>
            </form>
        </div>
    )
}

export default DetalleProducto;