import React, { Component } from 'react';
import axios from 'axios';

class EstadisticasRecurso extends Component {

    constructor(props){
        super(props);
        this.state = {
            recurso: '',
            clientes: []
        }
    }

    componentWillMount(){
        this.getRecurso();
    }

    getRecurso = () => {
        axios.get(`http://localhost:5000/api/recurso/${this.props.id}`)
            .then(res => {
                this.setState({
                    clientes: res.data.clientes,
                    recurso: res.data
                })
            })
    }

    render() {
        return (
            <div>
                <h2 className="center">{this.state.recurso.nombre}</h2>
                <p>Obtenido por {this.state.clientes.length} personas</p>

                <table className="striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha de nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.clientes.map(cliente => {
                            return(
                                <tr key={cliente._id}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.fechaNac.substr(0,10)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EstadisticasRecurso;