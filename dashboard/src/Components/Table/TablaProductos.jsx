import React from "react"
import { useEffect, useState } from "react";
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Table from "./Row";

function TablaProductos(props) {
    
    return(
        <div>
            <h5>Pagina</h5>
            <Table />
        </div>
    )
}

export default TablaProductos;