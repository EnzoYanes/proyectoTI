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
import ArticulosProveedor from './ArticulosProveedor';
import EstadisticasRecurso from './EstadisticasRecurso';
import ArticuloDetalle from './ArticuloDetalle';
import AltaCategoria from './AltaCategoria';
import Suscripciones from './Suscripciones';
import AltaRecurso from './AltaRecurso';
import EditarRecurso from './EditarRecurso';
import EditarCliente from './EditarCliente';
import EditarProveedor from './EditarProveedor';
import ComprarSuscripcion from './ComprarSuscripcion';
import NavBar from './NavBar';
import ConfReg from './ConfReg';
import Tree from './Tree';

import SideBar from './SideBar';
import Footer from './Footer';


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
                
                <div style={{paddingLeft:100, paddingRight:100, paddingBottom:60}}>
                    <Route path="/login" render={(props) => (
                        <Login
                            auth={auth} {...props}
                        />
                    )} />
                    
                    <Route path="/registro" component={Registro} />
                    <Route exact path="/" component={Articulos} />
                    <Route path="/altaCategoria" component={AltaCategoria} />
                    <Route path="/suscripciones" component={Suscripciones} />
                    <Route path="/altaRecurso" render={() => (
                        <AltaRecurso auth={auth} />
                    )}/>

                    <Route path="/articulosProveedor" render={() => (
                        <ArticulosProveedor auth={auth} />
                    )} />
                    <Route path="/confReg/" component={ConfReg} />
                    
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
                    <Route exact path="/estadisticasRecurso/:recursoId" render={(props) => (
                        <EstadisticasRecurso
                            id={props.location.pathname.replace('/estadisticasRecurso/','')}
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
                <Footer />
            </div>
        </Router>
    );
}
