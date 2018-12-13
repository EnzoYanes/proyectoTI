import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import M from "materialize-css";
import history from '../history';

class NavBar extends Component {

    componentDidMount() {
        this.cargarDropdown();
    }
    
    cargarDropdown(){
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
        let options = {
            hover: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };
        M.Dropdown.init(dropdowns, options);
    }

    cerrarSesion = () => {
        this.props.auth.logout();
        history.replace('/');
    }

    render(){
        const {isAuthenticated} = this.props.auth
        let resultado;
        if (isAuthenticated()) {
            let user = this.props.auth.getUser();
            resultado = <div>
                <a href="/" className='dropdown-trigger btn' data-target='dropdown1' style={{width:200}} >{user.username}</a>
                <ul id='dropdown1' className='dropdown-content'>
                { user.tipo === 'Admin' ? 
                            <div>
                            <li><a href="/altaCategoria">Alta de categoria</a></li>
                            <li><a href="/suscripciones">Suscripciónes</a></li>
                            </div>
                            :
                            user.tipo === 'Proveedor' ?  
                                <div>
                                    <li><a href="/editarProveedor">Editar proveedor</a></li>
                                    <li><a href="/altaRecurso">Alta de recurso</a></li>
                                    <li><a href="/articulosProveedor">Mis recursos</a></li>
                                </div>
                                : 
                            <div>
                                <li><a href="/comprarSuscripcion">Comprar suscripción</a></li>
                                <li><a href="/editarCliente">Editar cliente</a></li>
                            </div>   
                    }          
                    <li className="divider"></li>
                    <li><a href="/" onClick={this.cerrarSesion}>Cerrar Sesión</a></li>
                </ul>
            </div>
            this.cargarDropdown();
        }else{
            resultado = <div>
                <Link to={'/login'} className="waves-effect waves-light btn">Iniciar sesión</Link>
                <Link to={'/registro'} className="waves-effect waves-light btn">Registrarse</Link>
            </div>
        }
        return (
            <div className="navbar-fixed">
                <nav className="nav-wrapper" style={{backgroundColor: '#717171'}}>
                    <ul className="left hide-on-med-and-down">
                        <Link to={'/'} className="btn">Inicio</Link>
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