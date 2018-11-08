import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ArticuloDetalle extends Component {

    constructor(props){
        super(props);
        this.state = {
            articulo: ''
        }
    }

    componentWillMount(){
        this.getArticulo();
    }

    getArticulo = () => {
        const idArticulo = this.props.location.pathname.replace('/articulo/', '');
        fetch(`http://localhost:5000/api/recurso/${idArticulo}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articulo: data
                })
            })
    }

    render() {
        //if(!props.articulo) return null;
        const {isAuthenticated} = this.props.auth;

        return (
            <div>
                { isAuthenticated() && (
                    <div>
                        <h4>Detalle del recurso</h4>
                        <img src={`../img/camisa_8.png`} alt={this.state.articulo.nombre} />
                        <p><b>Nombre:</b> {this.state.articulo.nombre}</p>
                        <p><b>Descripcion:</b> {this.state.articulo.descripcion}</p>
                        <p><b>Suscripcion:</b> {this.state.articulo.suscripcionReq}</p>
                    </div>
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