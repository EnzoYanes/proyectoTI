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
            resultado = <a className="btn" onClick={this.cerrarSesion}>Cerrar Sesión</a>
        }else{
            resultado = <div>
                <Link to={'/login'} className="waves-effect waves-light btn">Iniciar sesión</Link>
                <Link to={'/registro'} className="waves-effect waves-light btn">Registrarse</Link>
            </div>
        }
        return (
            <nav className="nav-wrapper">
                <ul className="left hide-on-med-and-down">
                    <Link to={'/altaCategoria'} className="waves-effect waves-light btn" >Alta Categoría</Link>
                    <Link to={'/suscripciones'} className="waves-effect waves-light btn" >Suscripciones</Link>
                </ul>
                <ul className="right hide-on-med-and-down">
                    <Link to={'/'} className="brand-logo center">Logo</Link>
                    {resultado}
                </ul>
            </nav>
        );
    }
}

export default NavBar;