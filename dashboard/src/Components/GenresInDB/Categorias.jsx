import React, { useEffect, useState } from "react";
import Categoria from "./Subcomponents/Categoria";

function Categorias() {
    const [categorias, setDataProd] = useState([])

	useEffect(()=>{
		fetch("http://localhost:4000/api/products"
		).then(response => response.json()).then(data => {
				setDataProd(data.categorias)
			})},[])

    return (
        <div className="col-lg-10 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800" >Categorias</h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        {
                            categorias.length == 0 && <h3>Cargando...</h3>
                        }
                        {
                            categorias.map(categoria =><Categoria key={categoria.id} name={categoria.categoria} total={categoria.total}/>)
                            
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorias;