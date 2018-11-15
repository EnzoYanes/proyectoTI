import React, { Component } from 'react';
import TreeView from 'deni-react-treeview';
class SideBar extends Component {
    render() {
        return (
          
                <div className="left">
                    <TreeView url="http://localhost:5000/api/categoria/"  showIcon={false}/>
                </div> 

           
            
        );
    }
}

export default SideBar;