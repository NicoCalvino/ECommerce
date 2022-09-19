import React from "react";
import { useEffect, useState } from 'react'
import Tarjetas from "./Tarjetas";
import Estilos from "./Estilos.css"


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
			icon: "fas fa-bicycle",
			value: datosProd[0]
		},
		{
			title: "Total Regulares",
			icon: "fas fa-store",
			value: datosProd[1]
		},
		{
			title: "Total Novedad",
			icon: "fas fa-star",
			value: datosProd[2]
		},
		{
			title: "Total en Oferta",
			icon: "fas fa-percentage",
			value: datosProd[3]
		}
	]
	
	let tarjetasUsuarios = [
		{
			title: "Total Usuarios",
			icon: "fas fa-user",
			value: datosUsers[0]
		},
		{
			title: "Gold",
			icon: "fas fa-crown",
			value: datosUsers[1]
		},
		{
			title: "Silver",
			icon: "fas fa-trophy",
			value: datosUsers[2]
		},
		{
			title: "Bronze",
			icon: "fas fa-award",
			value: datosUsers[3]
		},
		{
			title: "Nuevos",
			icon: "fas fa-child",
			value: datosUsers[4]
		}
	]

    return(
        <div className="container-fluid">
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="tituloPrincipal">BICIPAL</h1>
			</div>
		
			<div className="filaTarjetas">
				{
					tarjetasProductos.map(function(unaTarjeta){
						return <Tarjetas key={ unaTarjeta.title } title={unaTarjeta.title} icon={ unaTarjeta.icon } clase="tarjetaProductos" value={ unaTarjeta.value } />
					})
				}
			</div>
			<div className="filaTarjetas">
				{
					tarjetasUsuarios.map(function(unaTarjeta){
						return <Tarjetas key={ unaTarjeta.title } title={unaTarjeta.title} icon={ unaTarjeta.icon } clase="tarjetaUsuarios" value={ unaTarjeta.value } />
					})
				}
			</div>

			
		</div>
    )
}

export default ContentRowTop;