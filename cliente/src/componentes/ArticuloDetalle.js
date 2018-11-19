import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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

    obtenerRecurso = () => {
        const idRecurso = this.state.articulo._id;
        const idUser = this.state.idUser;
        axios.post(`http://localhost:5000/api/user/addRecurso/${this.state.idUser}`, {idRecurso});
        axios.post(`http://localhost:5000/api/recurso/addCliente/${idRecurso}`,{idUser});
        window.M.toast({html: 'Recurso obtenido'});
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
                        <p><b>Suscripcion:</b> {this.state.articulo.suscripcion}</p>
                        <button className="btn" onClick={this.obtenerRecurso}>Obtener</button>
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