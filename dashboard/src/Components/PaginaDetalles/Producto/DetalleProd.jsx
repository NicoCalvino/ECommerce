import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Estilos from "./Estilos.css"

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
        <div className="paginaDetalle">
            <h1 className="tituloProducto">{ producto != "" && producto.name } - { producto != "" && producto.marca }</h1>
            <div class="detalleDelProducto">
                <div className="divImagenProducto">
                    <img className="imagenProducto" src={  producto != "" && producto.imagen} alt="ImagenProducto" />
                </div>
                <div className="infoProducto">
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
                    <div className="botones">
                        <div className="botonVenta">
                            <a className="limpiarVinculos" href={producto.detalleBicipal}>BICIPAL VENTA</a>
                        </div>
                        <div className="botonEdicion">
                            <a className="limpiarVinculos" href={producto.edicionBicipal}>BICIPAL EDICION</a>
                        </div>
                    </div>
                    <div className="botones">
                        <div className="botonVolver">
                            <Link className="limpiarVinculos" to="/">Volver</Link>
                        </div>
                        <div className="botonEliminar">
                            <form action={producto.eliminar} class="boton-eliminar" method="POST">
                                <button class="botonEliminar" type="submit">ELIMINAR</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DetalleProducto;