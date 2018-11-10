import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <div>
                <ul id="slide-out" className="sidenav sidenav-fixed" style={{marginTop:64}}>
                    <li><a href="#/tasks">Categorias</a></li>
                    <li><div className="divider"></div></li>
                    <li><a href="#/tasks">Deportes</a></li>
                    <li><a href="#/tasks">Programación</a></li>
                    <li><a href="#/tasks">Cocina</a></li>
                    <li><a href="#/tasks">Negocios</a></li>
                </ul>
            </div>
            
        );
    }
}

export default SideBar;