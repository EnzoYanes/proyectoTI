import React, {Component} from 'react';
import TreeView from 'deni-react-treeview';

class Tree extends Component {


    render(){
        return(
            //<TreeView url="https://denifakedata.herokuapp.com/tree/countries "/>
            <TreeView url="http://localhost:5000/articulos  " showRoot={true} />
        )
    }
}

export default Tree;