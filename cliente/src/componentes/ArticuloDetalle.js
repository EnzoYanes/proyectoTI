import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Iframe from 'react-iframe'   
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
        axios.get(`http://localhost:5000/api/recurso/${idArticulo}`)
            .then(res => {
                this.setState({
                    articulo: res.data,
                    clientes: res.data.clientes
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
            axios.post(`http://localhost:5000/api/recurso/addCliente/${idRecurso}`,{idUser});
            window.M.toast({html: 'Recurso obtenido'});
            this.state.clientes.push(this.state.user);
            this.setState({
                clientes: this.state.clientes
            })
        } else {
            window.M.toast({html: 'No cumple la suscripción requerida'});
        }
    }

    tieneRecurso = () => {
        return this.state.clientes.some(c => c._id === this.state.user._id);
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        let resultado;
        let descargar;
        if (!this.tieneRecurso()) {
            resultado = <div>
                <p><b>Suscripcion:</b> {this.state.articulo.suscripcion}</p>
                {
                    this.state.user.tipo === 'Cliente' ?
                        <button className="btn" onClick={this.obtenerRecurso}>Obtener</button>
                        : ''
                }
            </div>
        }else{
            if (this.state.articulo.tipo === "Video") {
               resultado = <video src={`/img/${this.state.articulo.archivo}`} controls style={{width: '60%'}}/>
            }else{
                resultado = <div>
                    <Iframe 
                        url={'/img/'+this.state.articulo.archivo}
                        width="100%"
                        height="700px"
                        id="myId"
                        position="relative"
                    />
                    <br/><br/>
                </div>
            }
            if (this.state.articulo.descargable === true) {
                descargar = <div>
                    <a className="btn" href={'/img/'+this.state.articulo.archivo} download >Descargar</a>
                    <br/><br/>
                </div>
            }
        }
        return (
            <div>
                { isAuthenticated() && (
                    <div>
                        <h4>Detalle del recurso</h4>
                        <p><b>Nombre:</b> {this.state.articulo.nombre}</p>
                        <p><b>Descripcion:</b> {this.state.articulo.descripcion}</p>
                        {descargar}
                        {resultado}
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