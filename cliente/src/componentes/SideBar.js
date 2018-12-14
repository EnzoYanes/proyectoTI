import React, { Component } from 'react';
import TreeView from 'deni-react-treeview';
import history from '../history';
import M from "materialize-css";


class SideBar extends Component {

    onSelectItem(item) {
        let newCats = [];
        newCats.push(item.nombre);
        for (const key in item.children){
            newCats.push(item.children[key].nombre);
        }
        this.props.setCategorias(newCats)
        history.replace('/');
    }

    cargarSidenav(){
        let sidenav = document.querySelectorAll('.sidenav');
        let options = {
            hover: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };
        M.Sidenav.init(sidenav, options);
    }  

    render() {
        this.cargarSidenav();
        
        return (
            <div className="left theme-customization" >
                <ul id="slide-out" className="sidenav">
                    <TreeView url="http://localhost:5000/api/categoria/" showIcon={false}
                        onSelectItem={ this.onSelectItem.bind(this) }
                    />
                </ul>
                <a href="#!" data-target="slide-out" className="sidenav-trigger" style={{position:'fixed'}}><i className="material-icons">menu</i></a>
            </div> 
        );
    }
}

export default SideBar;