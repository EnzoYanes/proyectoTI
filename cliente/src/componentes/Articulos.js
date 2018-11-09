import React, { Component } from 'react';
import Articulo from './Articulo';
import axios from 'axios';

class Articulos extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.queryAPI();
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
            <div>
                <h2>Nuestros Articulos</h2>
                <ul>
                    {Object.keys(this.state.articulos).map(articulo => (
                        <Articulo
                            informacion={this.state.articulos[articulo]}
                            key={articulo}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Articulos;