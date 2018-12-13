import React, { Component } from 'react';
import axios from 'axios';


class AltaRecurso extends Component {

    constructor(props){
        super(props);
        this.state = {
            categoria: '',
            nombre: '',
            descripcion: '',
            imagen: '',
            tipo: '',
            suscripcion: '1',
            descargable: false,
            archivo: '',
            categorias: [],
            idUser: '',
            totCat: []
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.addRecurso = this.addRecurso.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentWillMount(){
        this.getUser();
        this.getCategorias();
    }
  
    getUser(){
        let user = this.props.auth.getUser();
        this.setState({idUser: user._id});
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
                    suscripcion: '1',
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
                            <div class="file-field input-field">
                                <div class="btn light-blue darken-4">
                                    <span>Archivo</span>
                                    <input type="file" name="file" id="inputFileServer" onChange = {(e) => {this.cambiarFile(e)}} /> <br/><br/>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text"/>
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