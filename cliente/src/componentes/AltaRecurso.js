import React, { Component } from 'react';

class AltaRecurso extends Component {

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
                this.upload();
                window.M.toast({html: 'Recurso creado'});
                this.setState({categoria: '',
                    nombre: '',
                    descripcion: '',
                    imagen: '',
                    tipo: '',
                    suscripcion: '',
                    descargable: false,
                    archivo: '',
                    categorias: []});
                this.getCategorias();
            }
        })
        .catch(error => console.log(error));
        e.preventDefault();
    }

    cambiarFile(e){
        const input = document.getElementById('inputFileServer');
        if(input.files && input.files[0]){
            let nom = input.files[0].name;
           // let nombre = nom.replace(/ /g, "");
            this.setState({archivo: nom})
            //console.log(input.files[0]); //obtiene todos los datos del file (+'.name' para obtener el nombre )
        }
    }

    upload(e){
        const input = document.getElementById('inputFileServer');
        if(input.files && input.files[0]){
            const formData = new FormData();
            formData.append('file', input.files[0]);
             fetch('http://localhost:5000/api/recurso/upload', {
                 method: 'POST',
                 body: formData
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8">
                        <h4>Alta recurso</h4>
                        <form onSubmit={this.addRecurso}>
                            <select name="categoria" value={this.state.categoria} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione categoria</option>
                                {
                                    this.state.categorias.map(cat => {
                                        return(
                                            <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
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
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Archivo</span>
                                    <input type="file" name="file" id="inputFileServer" onChange = {(e) => {this.cambiarFile(e)}} /> <br/><br/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
                            <button type="submit" className="btn light-blue darken-4">Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AltaRecurso;