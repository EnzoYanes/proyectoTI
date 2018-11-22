import React, { Component } from 'react';



}
class Confirmacion extends Component{

    componentWillMount(){
        alert("que anda la banda");
    }

    conf(){
        var ident = this.props.location.pathname.replace('/articulo/', '');``
        fetch(`/api/user/${ident}`)
    }

    
    render(){
        return(
            <div>
                <h1>HOLA A TODOS</h1>
                <button onClick={this.conf}>Presione aqui para confirmar Registro</button>
            </div>
        )
    }
}

export default Confirmacion;