import React, {Component} from 'react';
import axios from 'axios';
import dateformat from 'dateformat';

class EditarCliente extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            nombre: '',
            apellido: '',
            fechaNac: '',
            correo: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }

    componentWillMount(){
        const User = this.props.auth.getUser();
        this.getCliente(User._id);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    getCliente(idUser){
        axios.get(`http://localhost:5000/api/user/${idUser}`)
            .then(res => {
                let fecha = new Date(res.data.fechaNac.replace('T00','T12'));
                fecha = dateformat(fecha, 'yyyy-mm-dd');
                this.setState({
                    username: res.data.username,
                    nombre: res.data.nombre,
                    apellido: res.data.apellido,
                    fechaNac: fecha,
                    correo: res.data.correo
                })
            })
    }

    actualizar(e){
        const User = this.props.auth.getUser();
        const cliente = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            fechaNac: this.state.fechaNac,
            correo: this.state.correo
        }
        axios.put(`http://localhost:5000/api/user/${User._id}`, {cliente})
            .then(res => {
                if(res.status === 200){
                    window.M.toast({html: res.data.message});
                }
                else{
                    window.M.toast({html: 'Hubo un error'});
                }
            })
            .catch(error => console.log(error));
        e.preventDefault();
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <h1>Actualizar datos de Cliente</h1>
                    <div className="col s6">
                        <form onSubmit={this.actualizar}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" disabled={true} />
                            <input name="nombre" value={this.state.nombre} onChange={this.handleChange} type="text" placeholder="Nombre" required />
                            <input name="apellido" value={this.state.apellido} onChange={this.handleChange} type="text" placeholder="Apellido" required />
                            <input name="fechaNac" value={this.state.fechaNac} onChange={this.handleChange} type="date" required />
                            <input name="correo" value={this.state.correo} onChange={this.handleChange} type="text" placeholder="Correo electrónico" required />
                            
                            <button type="submit" className="btn light-blue darken-4">Guardar</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EditarCliente;