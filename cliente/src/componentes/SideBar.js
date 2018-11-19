import React, { Component } from 'react';
import TreeView from 'deni-react-treeview';
import history from '../history';

class SideBar extends Component {

    onSelectItem(item) {
       
        history.replace('/login');
      }
    render() {
        return (
          
                <div className="left theme-customization">
                    <TreeView url="http://localhost:5000/api/categoria/"  showIcon={false}
                    onSelectItem={ this.onSelectItem.bind(this) }
                    />
                </div> 
        );
    }
}

export default SideBar;