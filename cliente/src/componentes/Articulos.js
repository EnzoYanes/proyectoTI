import React, { Component } from 'react';
import Articulo from './Articulo';
import axios from 'axios';

class Articulos extends Component {

    constructor(props){
        super(props);
        this.state = {
            articulos: []
        }
    }

    componentDidMount(){
        this.getRecursos();
        this.CrearSuscripciones();
    }

    componentWillReceiveProps(){
        this.getRecursos();
    }

    CrearSuscripciones = () => {
        axios.get('http://localhost:5000/api/suscripcion')
            .then(res => {
                if (res.data.length === 0) {
                    const suscripciones = [
                        {_id: 1, nombre: 'Free', precio: 0},
                        {_id: 2, nombre: 'Silver', precio: 5},
                        {_id: 3, nombre: 'Gold', precio: 10}
                    ];
                    const user = {username: 'admin', password: 'admin', nombre: 'Administrador', tipo: 'Admin', activo: true};
                    suscripciones.map(item => (
                        axios.post('http://localhost:5000/api/suscripcion/',{item})
                    ));
                    axios.post('http://localhost:5000/api/user/register/',{user});
                }
            })
    }

    getRecursos = () => {
        axios.get('http://localhost:5000/api/recurso')
            .then(res => {
                const cat = this.props.categorias;
                let recursos = [];
                recursos = res.data;
                if (cat.length > 0){
                    recursos = recursos.filter(
                        function(e){
                            return this.indexOf(e.categoria) >= 0;
                        },
                        cat
                    );
                }
                this.setState({
                    articulos: recursos
                })
            })
    }

    render() {
        const userTipo = this.props.auth.getUser().tipo;
        return (
            <React.Fragment>
                <h2 className="center">Nuestros Articulos</h2>
                <div className="row">
                    {Object.keys(this.state.articulos).map(articulo => (
                        <Articulo
                            informacion={this.state.articulos[articulo]}
                            key={articulo}
                            userTipo={userTipo}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Articulos;