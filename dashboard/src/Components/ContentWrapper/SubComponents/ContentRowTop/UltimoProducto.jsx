import React from "react";
import { useEffect, useState } from "react";
import LastMovie from '../../../../Assets/images/mandalorian.jpg';


function UltimoProducto() {
    const [productos, setDataProd] = useState([])

	useEffect(()=>{
		fetch("http://localhost:4000/api/products"
		).then(response => response.json()).then(data => {
				setDataProd(data.data)
                console.log(productos)
			})},[])
    

    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto </h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={ {width: "40rem"} } src={LastMovie} alt=" Star Wars - Mandalorian " />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
}

export default UltimoProducto;