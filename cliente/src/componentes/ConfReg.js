import React, { Component } from 'react';
import axios from 'axios';

class ConfReg extends Component {

    constructor(props){
        super(props)
        this.state = {
            idUser : 'vacio'
        }
        this.conf = this.conf.bind(this);
    }

    componentWillMount(){
        let id = this.props.location.pathname.replace('/confReg/', '');
        this.setState({
            idUser : id
        })
    }

    conf(){
        axios.post(`http://localhost:5000/api/user/confReg/${this.state.idUser}`)
        .then( res => {
            if(res.data.ok){
                window.M.toast({html: 'Usuario activado'});   
                this.props.history.push("/login");
            }
            else{
                window.M.toast({html: 'Error en activacion'});  
            }
        })

    }

    render(){
        return(
            <div>
                <h1>Confirmacion de registro</h1>
                <button onClick={this.conf} className="btn">Presione aqui para confirmar Registro</button>
            </div>
        )
    }
}

export default ConfReg;