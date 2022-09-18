import React from "react"
import { useEffect, useState, useRef } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Table from "./TablePrueba";

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
            <Table pag={nroPagina} />
            <h5 ref={titPagina}>Pagina {nroPagina}</h5>
            <button className="btn btn-primary" onClick={() => setPagina(anterior())}>Anterior</button>
            <button className="btn btn-success" onClick={() => setPagina(siguiente())}>Siguiente</button>
        </div>
    )
}

export default TablaProductos;