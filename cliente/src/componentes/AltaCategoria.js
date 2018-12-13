import React, { Component } from 'react';

class AltaCategoria extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            nombrePadre:'',
            categorias:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCategoria = this.addCategoria.bind(this);
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

    addCategoria(e){
        fetch('http://localhost:5000/api/categoria/'+this.state.nombrePadre, {
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
                window.M.toast({html: 'Categoria creada'});
                this.getCategorias();
                this.setState({nombre:'', nombrePadre: ''});
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
                        <h4>Alta categoria</h4>
                        <form onSubmit={this.addCategoria}>
                            <select name="nombrePadre" value={this.state.nombrePadre} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione padre</option>
                                {
                                    this.state.categorias.map(cat => {
                                        return(
                                            <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
                                        )
                                    })
                                }
                            </select>
                            <input name="nombre" value={this.state.nombre} onChange={this.handleChange} type="text" placeholder="Nombre" required />
                            
                            <button type="submit" className="btn">Crear</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default AltaCategoria;