import React, { Component } from 'react';
import TreeView from 'deni-react-treeview';
import history from '../history';
import M from "materialize-css";


class SideBar extends Component {

    onSelectItem(item) {
       
        history.replace('/login');
      }

    componentWillMount(){
        this.cargarSidenav();
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
                    <ul id="slide-out" class="sidenav">
                        <TreeView url="http://localhost:5000/api/categoria/"  showIcon={false}
                            onSelectItem={ this.onSelectItem.bind(this) }
                        />
                    </ul>
                    <a href="#" data-target="slide-out" class="sidenav-trigger" style={{position:'fixed'}}><i class="material-icons">menu</i></a>
                </div> 
        );
    }
}

export default SideBar;