import React, { Component } from 'react';
import axios from 'axios';

class Suscripciones extends Component {

    constructor(props){
        super(props);
        this.state = {
            _id: '',
            nombre:'',
            precio:'',
            suscripciones:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateSuscripcion = this.updateSuscripcion.bind(this);
    }

    componentDidMount(){
        this.getSuscripciones();

    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    getSuscripciones(){
        axios.get('http://localhost:5000/api/suscripcion/')
            .then(res => {
                this.setState({suscripciones: res.data});
            })
    }

    updateSuscripcion(e){
        if (this.state._id){
            const precio = this.state.precio;
            axios.put(`http://localhost:5000/api/suscripcion/${this.state._id}`,{precio})
            .then(res => {
                window.M.toast({html: 'Suscripcion actualizada'});
                this.setState({_id:'', nombre:'', precio:''})
                this.getSuscripciones();
            })
        }
        e.preventDefault();
    }

    editSuscripcion(id){
        fetch(`http://localhost:5000/api/suscripcion/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    _id: data._id,
                    nombre: data.nombre,
                    precio: data.precio
                })
            })
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.updateSuscripcion}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" value={this.state.nombre}  type="text" disabled={true} />
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="precio" value={this.state.precio} onChange={this.handleChange} type="number" placeholder="Precio"/>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn">
                                            Actualizar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.suscripciones.map(item =>{
                                            return(
                                                <tr key={item._id}>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.precio}</td>
                                                    <td>
                                                        <button className="btn" onClick={() => this.editSuscripcion(item._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Suscripciones;