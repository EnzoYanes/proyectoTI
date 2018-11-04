import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ArticuloDetalle extends Component {

    state = {
        articulo: ''
    }

    componentWillMount(){
        //this.getArticulo();
    }

    getArticulo = () => {
        fetch('http://localhost:5000')
            .then(res => res.json())
            
    }

    render() {
        //if(!props.articulo) return null;
        const {isAuthenticated} = this.props.auth;
        const idArticulo = this.props.location.pathname.replace('/articulo/', '');

        return (
            <div>
                { isAuthenticated() && (
                    <h3>Detalles del articulo id: {idArticulo}</h3>
                )}
                
                { !isAuthenticated() && (
                    <div>
                        <p>Para ver el contenido debes estar logueado</p>
                        <Link to="/login">Iniciar Sesión</Link>
                    </div>
                )}
            </div>
        );
    }
};

export default ArticuloDetalle;