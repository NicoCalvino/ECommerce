import './Assets/css/app.css';
import Principal from './Components/Principal/Principal';
import ProductWrapper from './Components/PaginaDetalles/Producto/ProductWrapper'
import UserWrapper from './Components/PaginaDetalles/Usuario/UserWrapper'
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function App() {
  
  return (
    <div id="wrapper">
		<Switch>
			<Route path="/" exact component={Principal} />
			<Route path="/productos/:id" exact component={ProductWrapper} />
			<Route path="/usuarios/:id" exact component={UserWrapper} />
		</Switch>
	</div>
  );
}

export default App;
