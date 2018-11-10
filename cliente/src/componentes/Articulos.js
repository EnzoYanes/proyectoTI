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