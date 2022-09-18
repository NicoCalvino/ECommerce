import React from "react"
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function Row(props) {
    const { rowData = {}, columns = [] } = props;
    return (
        <tr>
            
            {
                columns.map((col, i) => <td key={ i }> { col == "NOMBRE" ? <Link to={"/productos/" + rowData.id} >{rowData.name}</Link> : <Link to={"/productos/" + rowData.id} >{rowData.marca}</Link> } </td>)
            }
            
        </tr>
    )
}

export default Row;