import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function DetalleUser(props) {
    const id = Number(props.idUser)
    const [usuario, setUser] = useState({})
    const [intereses, setIntereses] = useState({})

	useEffect(()=>{
		fetch("http://localhost:4000/api/users/" + id
		).then(response => response.json()).then(data => {
            setUser(data)         
            setIntereses(data.intereses)         
			})},[])

    return(
        <div className="paginaDetalle">
            <h1 className="tituloProducto">{ usuario != "" && usuario.nombre }  { usuario != "" && usuario.apellido }</h1>
            <div class="detalleDelProducto">
                <div className="divImagenProducto">
                    <img className="imagenProducto" src={  usuario != "" && usuario.imagen} alt="ImagenProducto" />
                </div>
                <div className="infoProducto">
                    <p>Cliente desde: {usuario!= "" && usuario.created_at }</p>
                    <h5>CATEGORIA: {usuario != "" && usuario.categoria}</h5>
                    <h4>INTERESES</h4>
                    {intereses.length == 0 && <p>Cargando...</p>}
                    {intereses.length > 0 && intereses.map(caract => <p>{caract.toUpperCase()}</p>)}
                    <div className="botones">
                        <div className="botonEdicion">
                            <a className="limpiarVinculos" href={usuario.edicionBicipal}>BICIPAL EDICION</a>
                        </div>
                    </div>
                    <div className="botones">
                        <div className="botonVolver">
                            <Link className="limpiarVinculos" to="/">Volver</Link>
                        </div>
                        <div className="botonEliminar">
                            <form action={usuario.eliminar} class="boton-eliminar" method="POST">
                                <button class="botonEliminar" type="submit">ELIMINAR</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DetalleUser;