import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {

    cerrarSesion = () => {
        this.props.auth.logout();
    }

    render(){
        const {isAuthenticated} = this.props.auth
        let resultado;
        if (isAuthenticated()) {
            resultado = <div>
                <Link to={'/editarProveedor'} className="waves-effect waves-light btn">Edit Proveedor</Link>
                <Link to={'/editarCliente'} className="waves-effect waves-light btn">Edit cliente</Link>
                <button className="btn" onClick={this.cerrarSesion}>Cerrar Sesión</button>
            </div>
        }else{
            resultado = <div>
                <Link to={'/login'} className="waves-effect waves-light btn">Iniciar sesión</Link>
                <Link to={'/registro'} className="waves-effect waves-light btn">Registrarse</Link>
            </div>
        }
        return (
            <div className="navbar-fixed">
                <nav className="nav-wrapper">
                    <ul className="left hide-on-med-and-down">
                        <Link to={'/'} className="btn">Inicio</Link>
                        <Link to={'/altaCategoria'} className="waves-effect waves-light btn" >Alta Categoría</Link>
                        <Link to={'/suscripciones'} className="waves-effect waves-light btn" >Suscripciones</Link>
                        <Link to={'/altaRecurso'} className="waves-effect waves-light btn" >Alta Rec</Link>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        {resultado}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavBar;