import React, { Component } from 'react';
import Articulo from './Articulo';
import axios from 'axios';

class Articulos extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.queryAPI();
        this.CrearSuscripciones();
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
                    suscripciones.map(item => (
                        axios.post('http://localhost:5000/api/suscripcion/',{item})
                    ));
                }
            })
    }

    queryAPI = () => {
        const url = 'http://localhost:5000/api/recurso';
        axios.get(url)
            .then(res => {
                this.setState({articulos: res.data})
            })
    }

    render() {
        return (
  
            <React.Fragment>
                <h2 className="center">Nuestros Articulos</h2>
                <div className="row">
                    {Object.keys(this.state.articulos).map(articulo => (
                        <Articulo
                            informacion={this.state.articulos[articulo]}
                            key={articulo}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Articulos;