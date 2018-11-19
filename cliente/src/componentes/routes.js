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
import AltaCategoria from './AltaCategoria';
import Suscripciones from './Suscripciones';
import AltaRecurso from './AltaRecurso';
import EditarRecurso from './EditarRecurso';
import EditarCliente from './EditarCliente';
import EditarProveedor from './EditarProveedor';
import ComprarSuscripcion from './ComprarSuscripcion';
import NavBar from './NavBar';

import Tree from './Tree';

import SideBar from './SideBar';


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
                <SideBar />
                <div style={{paddingLeft:300}}>
                    <Route path="/login" render={(props) => (
                        <Login
                            auth={auth} {...props}
                        />
                    )} />
                    
                    <Route path="/registro" component={Registro} />
                    <Route exact path="/" component={Articulos} />
                    <Route path="/altaCategoria" component={AltaCategoria} />
                    <Route path="/suscripciones" component={Suscripciones} />
                    <Route path="/altaRecurso" component={AltaRecurso} />

                    <Route exact path="/articulo/:articuloId" render={(props) => (
                        <ArticuloDetalle
                            auth={auth} {...props}
                        />
                    ) } />
                    <Route exact path="/editarRecurso/:recursoId" render={(props) => (
                        <EditarRecurso
                            id={props.location.pathname.replace('/editarRecurso/','')}
                        />
                    ) } />
                    <Route exact path="/editarCliente" render={(props) => (
                        <EditarCliente
                            auth={auth}
                        />
                    ) } />
                    <Route exact path="/editarProveedor" render={(props) => (
                        <EditarProveedor
                            auth={auth}
                        />
                    ) } />
                    <Route exact path="/comprarSuscripcion" render={(props) => (
                        <ComprarSuscripcion
                            auth={auth}
                        />
                    ) } />
                </div>

                <Route path="/tree" component={Tree}/>

            </div>
        </Router>
    );
}
