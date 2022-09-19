import React from "react";
import Header from "../Header/Header";
import ContentRowTop from "./SubComponents/ContentRowTop/ContentRowTop";
import UltimoProducto from "./SubComponents/UltimoProducto"
import UltimoUsuario from "./SubComponents/UltimoUsuario"
import Categorias from "../GenresInDB/Categorias"
import Footer from "../Footer/Footer";
import TablaProductos from "../Table/TablaProductosPrueba";

function Principal() {
	return(
		<div id="wrapper">
			<div id="content-wrapper" className="d-flex flex-column">

			<div id="content">
				<Header />
				<ContentRowTop />
			</div>
			<div className="row">
				<UltimoProducto />
				<UltimoUsuario />			
				<Categorias />
			</div>
			<TablaProductos />
			<Footer />
		</div>
	</div>
	)
	
}

export default Principal;