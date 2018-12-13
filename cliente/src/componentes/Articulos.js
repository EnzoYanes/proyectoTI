import React, { Component } from 'react';
import Articulo from './Articulo';
import axios from 'axios';

class Articulos extends Component {

    constructor(props){
        super(props);
        this.state = {
            articulos: [],
            aux: []
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
                    articulos: recursos,
                    aux: recursos
                })
            })
    }

    buscador = (e) => {
        if (e.target.value.length > 3) {
            this.setState({
                aux: this.state.articulos.filter(x => (
                    x.nombre.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ))
            })
        }else{
            this.setState({
                aux: this.state.articulos
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="center">Nuestros Articulos</h2>
                <input type="text" placeholder="Busqueda" onChange={this.buscador} style={{width:'300px'}}/>
                <div className="row">
                    {Object.keys(this.state.aux).map(articulo => (
                        <Articulo
                            informacion={this.state.aux[articulo]}
                            key={articulo}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Articulos;