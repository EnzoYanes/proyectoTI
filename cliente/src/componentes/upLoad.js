import React, { Component } from 'react';

class UpLoad extends Component{

    render(){
        return(
            <div>
                <form action = 'http://localhost:5000/api/user/upload' method="POST" enctype="multipart/form-data">
                    <input type="file" name="file"/>
                    <input type="text" name="a" />
                    <input type="submit" value="Subir" />
                </form>
            </div>
        )
    }
}

export default UpLoad;