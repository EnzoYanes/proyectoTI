import React, { Component } from 'react';
import Articulo from './Articulo';
import TreeView from 'deni-react-treeview';

class Articulos extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.queryAPI();
    }

    queryAPI = () => {
        //const {getAccessToken} = this.props.auth;
        //const headers = {'Authorization': `Bearer ${getAccessToken()}`};
        const url = 'http://localhost:5000/api/recurso';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({articulos: data})
            })
    }

    render() {
        return (
            <div>

                <div className="left">
                    <TreeView url="http://localhost:5000/articulos" showRoot={true} />
                </div> 
                
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

            </div>
        );
    }
}

export default Articulos;