import React, { Component } from 'react';
import ArticuloProveedor from './ArticuloProveedor';
import axios from 'axios';

class ArticulosProveedor extends Component {

    constructor(props){
        super(props);
        this.state = {
            recursos: []
        }
    }

    componentWillMount(){
        this.getRecursos();
    }

    getRecursos = () => {
        const idUser = this.props.auth.getUser()._id;
        axios.get(`http://localhost:5000/api/user/${idUser}`)
            .then(res => {
                this.setState({
                    recursos: res.data.recursos
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="center">Mis recursos</h2>
                <div className="row">
                    {Object.keys(this.state.recursos).map(rec => (
                        <ArticuloProveedor
                            informacion={this.state.recursos[rec]}
                            key={rec}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default ArticulosProveedor;