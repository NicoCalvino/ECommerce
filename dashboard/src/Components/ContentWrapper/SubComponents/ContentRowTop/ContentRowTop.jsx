import React from "react";
import { useEffect, useState } from 'react'
import Categorias from "../../../GenresInDB/Categorias";
import Table from "../../../Table/Table";
import ContentRowTarjetas from "./ContentRowTarjetas";
import UltimoProducto from "./UltimoProducto";
import UltimoUsuario from "./UltimoUsuario";

function ContentRowTop() {
	const [datosProd, setDataProd] = useState([])
	const [datosUsers, setDataUser] = useState([])

	useEffect(()=>{
		fetch("http://localhost:4000/api/products"
		).then(response => response.json()).then(data => {
				setDataProd([data.meta.total, data.meta.prodNorm, data.meta.prodNovedad, data.meta.prodOferta])
			})},[])

	useEffect(()=>{
		fetch("http://localhost:4000/api/users"
		).then(response => response.json()).then(data => {
				setDataUser([data.meta.total, data.meta.goldUsers, data.meta.silverUsers, data.meta.bronzeUsers, data.meta.newUsers])
			})},[])

	let tarjetasProductos = [
		{
			title: "Total Productos",
			color: "border-bottom-primary",
			icon: "fas fa-bicycle",
			value: datosProd[0]
		},
		{
			title: "Total Regulares",
			color: "border-bottom-success",
			icon: "fas fa-store",
			value: datosProd[1]
		},
		{
			title: "Total Novedad",
			color: "border-bottom-primary",
			icon: "fas fa-star",
			value: datosProd[2]
		},
		{
			title: "Total en Oferta",
			color: "border-bottom-success",
			icon: "fas fa-percentage",
			value: datosProd[3]
		}
	]
	
	let tarjetasUsuarios = [
		{
			title: "Total Usuarios",
			color: "border-bottom-primary",
			icon: "fas fa-user",
			value: datosUsers[0]
		},
		{
			title: "Gold",
			color: "border-bottom-success",
			icon: "fas fa-crown",
			value: datosUsers[1]
		},
		{
			title: "Silver",
			color: "border-bottom-primary",
			icon: "fas fa-trophy",
			value: datosUsers[2]
		},
		{
			title: "Bronze",
			color: "border-bottom-success",
			icon: "fas fa-award",
			value: datosUsers[3]
		},
		{
			title: "Nuevos",
			color: "border-bottom-primary",
			icon: "fas fa-child",
			value: datosUsers[4]
		}
	]

    return(
        <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">BICIPAL</h1>
					</div>
				
					<div className="row">
						{
							tarjetasProductos.map(function(unaTarjeta){
								return <ContentRowTarjetas key={ unaTarjeta.title } title={unaTarjeta.title} icon={ unaTarjeta.icon } color={ unaTarjeta.color } value={ unaTarjeta.value } />
							})
						}
					</div>
					<div className="row">
						{
							tarjetasUsuarios.map(function(unaTarjeta){
								return <ContentRowTarjetas key={ unaTarjeta.title } title={unaTarjeta.title} icon={ unaTarjeta.icon } color={ unaTarjeta.color } value={ unaTarjeta.value } />
							})
						}
					</div>
		
					<div className="row">
						
						<UltimoProducto />
						<UltimoUsuario />
						<Categorias />
					</div>
				</div>
    )
}

export default ContentRowTop;