import React, {Component} from 'react';
import axios from 'axios';

class ComprarSuscripcion extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            nombre: '',
            apellido: '',
            suscripcion: '',
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
                this.setState({
                    username: res.data.username,
                    nombre: res.data.nombre,
                    apellido: res.data.apellido,
                    suscripcion: res.data.suscripcion,
                    correo: res.data.correo
                })
            })
    }

    actualizar(e){
        const User = this.props.auth.getUser();
        const cliente = {
            suscripcion: this.state.suscripcion
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
                    <h1>Cambiar suscripción</h1>
                    <div className="col s6">
                        <form onSubmit={this.actualizar}>
                            <input name="username" value={this.state.username} type="text" disabled={true} />
                            <input name="nombre" value={this.state.nombre} type="text" disabled={true} />
                            <input name="apellido" value={this.state.apellido} type="text" disabled={true} />
                            <select name="suscripcion" value={this.state.suscripcion} onChange={this.handleChange} className="browser-default">
                                <option value="1">Free</option>
                                <option value="2">Silver</option>
                                <option value="3">Gold</option>
                            </select>
                            <input name="correo" value={this.state.correo} type="text" disabled={true} />
                            <div style={{border:'solid', padding:'20px', width:'110%'}}>
                                <h4>Datos tarjeta</h4>
                                <div>
                                    <label for="numTarjeta">Numero de tarjeta</label>
                                    <input placeholder="XXXX-XXXX-XXXX-XXXX" id="numTarjeta" type="number" class="validate"/>
                                    <div>
                                        <img src="https://img.icons8.com/color/50/000000/visa.png" alt=''></img>
                                        <img src="https://img.icons8.com/color/50/000000/mastercard.png" alt=''></img>
                                    </div>
                                </div>
                                <div >
                                    <label for="titular">Nombre del titular de la tarjeta</label>
                                    <input placeholder="" id="titular" type="text" class="validate" />
                                </div>
                                <div className="col s6" >
                                    <label for="cvv">Codigo de seguridad</label>
                                    <input id="cvv" type="text" class="validate" maxLength="3"/>
                                </div>
                                <div>
                                    <div>
                                        <br></br><br></br><br></br><br></br>
                                    <label for="fechaEx">Fecha de vencimiento</label>
                                        <input id="date_expired" type="date" class="validate"/>
                                    </div>
                                </div>
                            </div>                            
                            <button type="submit" className="btn">Guardar</button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ComprarSuscripcion;