import React, { Component } from 'react';

class AltaRecurso extends Component {

    constructor(props){
        super(props);
        this.state = {
            idCategoria: '',
            nombre: '',
            descripcion: '',
            imagen: '',
            tipo: '',
            suscripcionReq: '',
            descargable: false,
            archivo: '',
            categorias: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addRecurso = this.addRecurso.bind(this);
    }

    componentWillMount(){
        this.getCategorias();
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
            })
    }

    addRecurso(e){
        fetch('http://localhost:5000/api/recurso/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/jason',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message){
                window.M.toast({html: data.message}); 
            }
            else{
                window.M.toast({html: 'Recurso creado'});
                this.setState({idCategoria: '',
                    nombre: '',
                    descripcion: '',
                    imagen: '',
                    tipo: '',
                    suscripcionReq: '',
                    descargable: false,
                    archivo: '',
                    categorias: []});
                this.getCategorias();
            }
        })
        .catch(error => console.log(error));
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <h4>Alta recurso</h4>
                        <form onSubmit={this.addRecurso}>
                            <select name="idCategoria" value={this.state.idCategoria} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione categoria</option>
                                {
                                    this.state.categorias.map(cat => {
                                        return(
                                            <option key={cat._id} value={cat._id}>{cat.nombre}</option>
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
                            <select name="suscripcionReq" value={this.state.suscripcionReq} onChange={this.handleChange} className="browser-default">
                                <option value="">Suscripción requerida</option>
                                <option value="Free">Free</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
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

                            <button type="submit" className="btn light-blue darken-4">Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AltaRecurso;