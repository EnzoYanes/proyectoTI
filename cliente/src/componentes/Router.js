import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Registro from './Registro';
import Error from './Error';
import Articulos from './Articulos';
import ArticuloDetalle from './ArticuloDetalle';
import NavBar from './NavBar';
import infoProductos from '../datos/datos.json';

class Router extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.setState({
            articulos: infoProductos
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/registro" component={Registro} />
                        <Route exact path="/" render={() => (
                            <Articulos
                                articulos={this.state.articulos}
                            />
                        )}/>
                        <Route exact path="/articulo/:articuloId" render={(props) => {
                            let idArticulo = props.location.pathname.replace('/articulo/', '');
                            return (
                                <ArticuloDetalle
                                    articulo={this.state.articulos[idArticulo]}
                                />
                            )
                        }}/>
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;