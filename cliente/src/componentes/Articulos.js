import React, { Component } from 'react';
import Articulo from './Articulo';
<<<<<<< HEAD
import TreeView from 'deni-react-treeview';
=======
import axios from 'axios';
>>>>>>> 9f82658c63982b69d8f762c5a1342e4cb571070d

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