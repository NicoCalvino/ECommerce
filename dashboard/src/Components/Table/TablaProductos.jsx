import React from "react"
import { useEffect, useState, useRef } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Estilos from "./Estilos.css"

import Table from "./Table";

function TablaProductos(props) {
    const [totalPaginas, setPaginas] = useState([])

    useEffect(()=>{
		fetch("http://localhost:4000/api/products?pageNum=1"
		).then(response => response.json()).then(data => {
            setPaginas(data.meta.paginas)
			})},[])

    const [nroPagina, setPagina] = useState(1)
    const titPagina = useRef()

    function anterior(){
        if (nroPagina > 1){
            return nroPagina-1
        }else{return 1}
    }

    function siguiente(){
        if (nroPagina < totalPaginas){
            return nroPagina + 1
        }else{return totalPaginas}
    }
    
    return(
        <div>
            <h2 className="tituloTabla">PRODUCTOS</h2>
            <Table pag={nroPagina} />
            <div className="botonesPrincipal">
                <button className="btn btn-primary" onClick={() => setPagina(anterior())}>Anterior</button>
                <h4 ref={titPagina}>{nroPagina}</h4>
                <button className="btn btn-success" onClick={() => setPagina(siguiente())}>Siguiente</button>
            </div>
        </div>
    )
}

export default TablaProductos;