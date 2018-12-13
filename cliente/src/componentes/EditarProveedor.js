import React, {Component} from 'react';
import axios from 'axios';
import dateformat from 'dateformat';

class EditarProveedor extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            nombre: '',
            apellido: '',
            fechaNac: '',
            correo: '',
            nombreEmpresa: '',
            linkEmpresa: ''
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
                    correo: res.data.correo,
                    nombreEmpresa: res.data.nombreEmpresa,
                    linkEmpresa: res.data.linkEmpresa
                })
            })
    }

    actualizar(e){
        const User = this.props.auth.getUser();
        const cliente = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            fechaNac: this.state.fechaNac,
            correo: this.state.correo,
            nombreEmpresa: this.state.nombreEmpresa,
            linkEmpresa: this.state.linkEmpresa
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
                    <h1>Actualizar datos de Proveedor</h1>
                    <div className="col s6">
                        <form onSubmit={this.actualizar}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" disabled={true} />
                            <input name="nombre" value={this.state.nombre} onChange={this.handleChange} type="text" placeholder="Nombre" required />
                            <input name="apellido" value={this.state.apellido} onChange={this.handleChange} type="text" placeholder="Apellido" required />
                            <input name="fechaNac" value={this.state.fechaNac} onChange={this.handleChange} type="date" required />
                            <input name="correo" value={this.state.correo} onChange={this.handleChange} type="text" placeholder="Correo electrónico" required />
                            <input name="nombreEmpresa" value={this.state.nombreEmpresa} onChange={this.handleChange} type="text" placeholder="Nombre de la empresa" required />
                            <input name="linkEmpresa" value={this.state.linkEmpresa} onChange={this.handleChange} type="text" placeholder="Link de la empresa" required />

                            <button type="submit" className="btn">Guardar</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EditarProveedor;