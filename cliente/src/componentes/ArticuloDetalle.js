import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ArticuloDetalle extends Component {

    constructor(props){
        super(props);
        this.state = {
            articulo: '',
            clientes: [],
            user: ''
        }
    }

    componentWillMount(){
        this.getDatos();
    }

    getDatos = () => {
        const idArticulo = this.props.location.pathname.replace('/articulo/', '');
        const userToken = this.props.auth.getUser();
        fetch(`http://localhost:5000/api/recurso/${idArticulo}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articulo: data,
                    clientes: data.clientes
                })
            })
        axios.get(`http://localhost:5000/api/user/${userToken._id}`)
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
    }

    obtenerRecurso = () => {

        if (this.state.user.suscripcion >= this.state.articulo.suscripcion) {
            const idRecurso = this.state.articulo._id;
            const idUser = this.state.user._id;
            axios.post(`http://localhost:5000/api/user/addRecurso/${idUser}`, {idRecurso});
            axios.post(`http://localhost:5000/api/recurso/addCliente/${idRecurso}`,{idUser});
            window.M.toast({html: 'Recurso obtenido'});
        } else {
            window.M.toast({html: 'No cumple la suscripción requerida'});
        }
    }

    tieneRecurso = () => {
        return this.state.clientes.some(c => c === this.state.user._id);
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        return (
            <div>
                { isAuthenticated() && (
                    <div>
                        <h4>Detalle del recurso</h4>
                        <img src={`../img/camisa_8.png`} alt={this.state.articulo.nombre} />
                        <p><b>Nombre:</b> {this.state.articulo.nombre}</p>
                        <p><b>Descripcion:</b> {this.state.articulo.descripcion}</p>
                        { !this.tieneRecurso() && (
                            <React.Fragment>
                                <p><b>Suscripcion:</b> {this.state.articulo.suscripcion}</p>
                                <button className="btn" onClick={this.obtenerRecurso}>Obtener</button>
                            </React.Fragment>
                        )}
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