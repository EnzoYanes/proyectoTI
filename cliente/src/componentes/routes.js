import React from 'react';
import { Route, Router } from 'react-router-dom';

// Auth0
import Auth from '../Auth/Auth';
import history from '../history';

// Componentes Propios
import Login from './Login';
import Registro from './Registro';
//import Error from './Error';
import Articulos from './Articulos';
import ArticuloDetalle from './ArticuloDetalle';
import NavBar from './NavBar';

const auth = new Auth();

/*const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}*/

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <NavBar auth={auth} />

                <Route path="/login" render={(props) => (
                    <Login
                        auth={auth} {...props}
                    />
                )} />
                <Route path="/registro" component={Registro} />

                <Route exact path="/" component={Articulos} />

                <Route exact path="/articulo/:articuloId" render={(props) => (
                    <ArticuloDetalle
                        auth={auth} {...props}
                    />
                ) } />

            </div>
        </Router>
    );
}
