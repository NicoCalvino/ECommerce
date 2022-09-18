import './Assets/css/app.css';
import Main from './Components/Main';
import ProductWrapper from './Components/ContentWrapper/ProductWrapper'
import DetalleUser from './Components/DetalleUsuario/DetalleUser'
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function App() {
  
  return (
    <div id="wrapper">
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/productos/:id" exact component={ProductWrapper} />
			<Route path="/usuarios/:id" exact component={DetalleUser} />
		</Switch>
	</div>
  );
}

export default App;
