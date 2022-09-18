import React from "react";
import Topbar from "../Topbar/Topbar";
import ContentRowTop from "./SubComponents/ContentRowTop/ContentRowTop";
import Footer from "../Footer/Footer";
import TablaProductos from "../Table/TablaProductosPrueba";

class ContentWrapper extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [],
			columnTables: []
		}
	}

	render() {

		return(
			<div id="content-wrapper" className="d-flex flex-column">
	
				<div id="content">
					<Topbar />
					<ContentRowTop />
				</div>
				<TablaProductos />
				<Footer />
			</div>
		)
	}
}

export default ContentWrapper;