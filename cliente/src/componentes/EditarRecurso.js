import React, { Component } from 'react';
import axios from 'axios';

class EditarRecurso extends Component {

    constructor(props){
        super(props);
        this.state = {
            categoria: '',
            nombre: '',
            descripcion: '',
            imagen: '',
            tipo: '',
            suscripcion: '',
            descargable: false,
            archivo: '',
            categorias: [],
            totCat: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateRecurso = this.updateRecurso.bind(this);
    }

    componentWillMount(){
        this.getCategorias();
        this.getRecurso();
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    getCategorias(){
        fetch('http://localhost:5000/api/categoria/')
            .then(res => res.json())
            .then(data => {
                this.setState({categorias: data});
                this.recorrer()
            })
    }

    recorrer = () =>{
        let nue = [];
        let object = this.state.categorias
        for (const key in object) {
            nue.push(object[key].nombre);
            let hijo = object[key].children
            for (const key2 in hijo) {
                nue.push(hijo[key2].nombre);
            }    
        }
        this.setState({
            totCat: nue
        })
    }

    getRecurso(){
        axios.get(`http://localhost:5000/api/recurso/${this.props.id}`)
            .then(res => {
                this.setState({categoria: res.data.categoria,
                    nombre: res.data.nombre,
                    descripcion: res.data.descripcion,
                    imagen: res.data.imagen,
                    tipo: res.data.tipo,
                    suscripcion: res.data.suscripcion,
                    descargable: res.data.descargable,
                    archivo: res.data.archivo
                })
            })
    }

    updateRecurso(e){
        const recurso = {
            categoria: this.state.categoria,
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            imagen: this.state.imagen,
            tipo: this.state.tipo,
            suscripcion: this.state.suscripcion,
            descargable: this.state.descargable,
            archivo: this.state.archivo
        }
        axios.put(`http://localhost:5000/api/recurso/${this.props.id}`, {recurso})
            .then(data => {
                if(data.message){
                    window.M.toast({html: data.message}); 
                }
                else{
                    window.M.toast({html: 'Recurso actualizado'});
                }
            })
            .catch(error => console.log(error));
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s6">
                        <h4>Editar recurso</h4>
                        <form onSubmit={this.updateRecurso}>
                            <select name="categoria" value={this.state.categoria} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione categoria</option>
                                {
                                    this.state.totCat.map((item,index) => {
                                        return(
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            <input name="nombre" value={this.state.nombre} onChange={this.handleChange} type="text" placeholder="Nombre" required />
                            <input name="descripcion" value={this.state.descripcion} onChange={this.handleChange} type="text" placeholder="Descripcion" required />
                            <select name="tipo" value={this.state.tipo} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione tipo</option>
                                <option value="Artículo">Artículo</option>
                                <option value="Revista">Revista</option>
                                <option value="Libro">Libro</option>
                                <option value="Video">Video</option>
                            </select>
                            <select name="suscripcion" value={this.state.suscripcion} onChange={this.handleChange} className="browser-default">
                                <option value="">Suscripción requerida</option>
                                <option value="1">Free</option>
                                <option value="2">Silver</option>
                                <option value="3">Gold</option>
                            </select>
                            <p>
                                <label>
                                    <input 
                                        name="descargable" 
                                        checked={this.state.descargable}
                                        onChange={(e) => this.setState(prevState => ({descargable: !prevState.descargable}))} 
                                        type="checkbox" 
                                    />
                                    <span>Descargable</span>
                                </label>
                            </p>
                            <button type="submit" className="btn">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditarRecurso;