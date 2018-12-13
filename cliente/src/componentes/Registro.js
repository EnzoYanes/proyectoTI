import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Registro extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            nombre: '',
            apellido: '',
            fechaNac: '',
            correo: '',
            tipo: '',
            suscripcion: '1',
            nombreEmpresa: '',
            linkEmpresa: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    addUser(e){
        const user = {
            username: this.state.username,
            password: this.state.password,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            fechaNac: this.state.fechaNac,
            correo: this.state.correo,
            tipo: this.state.tipo,
            suscripcion: this.state.suscripcion,
            nombreEmpresa: this.state.nombreEmpresa,
            linkEmpresa: this.state.linkEmpresa,
            activo: false
        }
        axios.post('http://localhost:5000/api/user/register', {user})
            .then(res => {
                if(res.data.status){
                    window.M.toast({html: res.data.status});
                }
                else{
                    window.M.toast({html: 'Usuario creado'});   
                    this.props.history.push("/login");
                }
            })
            .catch(error => console.log(error));
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s6">
                        <h1>Registro</h1>
                        <form onSubmit={this.addUser}>
                            <select name="tipo" value={this.state.tipo} onChange={this.handleChange} className="browser-default">
                                <option value="">Seleccione tipo</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Proveedor">Proveedor</option>
                            </select>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Nick" required />
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Contraseña" required/>
                            <input name="nombre" value={this.state.nombre} onChange={this.handleChange} type="text" placeholder="Nombre" required />
                            <input name="apellido" value={this.state.apellido} onChange={this.handleChange} type="text" placeholder="Apellido" required />
                            <input name="fechaNac" value={this.state.fechaNac} onChange={this.handleChange} type="date" required />
                            <input name="correo" value={this.state.correo} onChange={this.handleChange} type="text" placeholder="Correo electrónico" required />
                            <input name="nombreEmpresa" value={this.state.nombreEmpresa} onChange={this.handleChange} type="text" placeholder="Nombre de la Empresa" />
                            <input name="linkEmpresa" value={this.state.linkEmpresa} onChange={this.handleChange} type="text" placeholder="Link de la Empresa" />

                            <button type="submit" className="btn light-blue darken-4">Crear</button>
                            <Link to={`/`} className="btn light-blue darken-4 right" >Inicio</Link>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Registro;