import React, { Component } from 'react';
import Articulo from './Articulo';

class Articulos extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.queryAPI();
    }

    queryAPI = () => {
        //console.log(this.props.auth.getAccessToken());
        //const {getAccessToken} = this.props.auth;
        //const headers = {'Authorization': `Bearer ${getAccessToken()}`};
        const url = 'http://localhost:5000/articulos';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({articulos: data})
            })
    }

    render() {
        return (
            <div className="center">
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