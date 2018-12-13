import React, {Component} from 'react';
import axios from 'axios';

class InfoUsuario extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuarios : [],
            usrInfo : '',
            arr:[],
            tpoSel:''
        }
        this.tipoUsu = this.tipoUsu.bind(this); 


    }

    componentWillMount(){
        this.getUsers()
    }

    getUsers = () => {
        axios.post(`http://localhost:5000/api/user/getAllUsers`)
            .then(res => {
                this.setState({
                    usuarios: res.data.filter(x => x.tipo !== 'Admin')
                })
            })
    }

    verInfo = (id) => {
        //alert(id);
        let object = this.state.usuarios;
        for (const key in object) {
            if (object[key]._id == id) {
                const usuario = object[key];
                this.setState({
                    usrInfo : usuario
                })
            }
        }
        let cont = document.getElementById('contenedor');
        cont.style.display = 'none';
        let info = document.getElementById('info');
        info.style.display = 'block';

    }

    mostrarCli = () => {
        let cont = document.getElementById('contenedor');
        cont.style.display = 'block';
        let info = document.getElementById('info');
        info.style.display = 'none';
    }

    tipoUsu = (e) => {
        let arr = this.state.usuarios.filter(x => x.tipo === e.target.value)
        this.setState({
            arr : arr
        })
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    render(){
        
        return(
            <div>
                <div id='contenedor'>
                    <h2>Lista de usuarios</h2>
                    <select name="tipo" onChange={this.tipoUsu} className="browser-default">
                                <option value="">Tipo de usuario</option>
                                <option value="Cliente">Clientes</option>
                                <option value="Proveedor">Proveedores</option>
                            </select>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>Username</th>                            
                                    <th>Correo</th>
                                    <th>Tipo cliente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.arr.map(usu => {
                                    return(
                                        <tr key={usu._id}>
                                            <td >{usu.username}</td>
                                            <td>{usu.correo}</td>
                                            <td>{usu.tipo}</td>
                                            { usu.tipo === 'Admin' ? null : <td><button className="btn" onClick={() => this.verInfo(usu._id)}>Ver info</button></td>}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id="info" style={{display:'none', width:'70%', paddingLeft:'15%'}} > 
                        
                        <button className="btn" onClick={() => this.mostrarCli()}>Mostrar clientes</button> 
                        
                        {
                            this.state.usrInfo ? 
                                <div>
                                    <h2>Informacion del cliente</h2>
                                    <table>
                                        <tr>
                                            <th>Tipo cliente</th>  <td>{this.state.usrInfo.tipo}</td>
                                        </tr>
                                        <tr>
                                            <th>Username</th> <td>{this.state.usrInfo.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Nombre</th> <td>{this.state.usrInfo.nombre}</td>
                                        </tr>
                                        <tr>
                                            <th>Apellido</th>  <td>{this.state.usrInfo.apellido}</td>
                                        </tr>
                                        <tr>
                                            <th>Fecha de nacimiento</th>  <td>{this.state.usrInfo.fechaNac.substr(0,10)}</td>
                                        </tr>
                                        <tr>
                                            <th>Correo</th>  <td>{this.state.usrInfo.correo}</td>
                                        </tr>
                                        <tr>
                                            <th>Suscripcion</th>  <td>{this.state.usrInfo.suscripcion}</td>
                                        </tr>
                                        {this.state.usrInfo.tipo === 'Proveedor' ?
                                        <React.Fragment>
                                        <tr>
                                            <th>Nombre empresa</th> <td>{this.state.usrInfo.nombreEmpresa}</td>
                                        </tr>
                                        <tr>
                                            <th>Link empresa</th>  <td><a href="#!">{this.state.usrInfo.linkEmpresa}</a></td>
                                        </tr>
                                        </React.Fragment>
                                        : null}
                                        
                                    </table>
                                </div>
                            : null
                        }
                        
                </div>
            </div>
        );
    }

}

export default InfoUsuario;