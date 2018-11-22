import React, { Component } from 'react';
import Articulo from './Articulo';




const estiloTabla = {
        background : "green",
        
}

class Articulos extends Component {

    state = {
        articulos: []
    }

    componentWillMount(){
        this.queryAPI();
    }

    queryAPI = () => {
        //console.log(this.props.auth.getAccessToken());
        //const {getAccessToken} = this.props.auth;
        //const headers = {'Authorization': `Bearer ${getAccessToken()}`};
        const url = 'http://localhost:5000/articulos';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({articulos: data})
            })
    }

    render() {
        return (
            <div >
                  <div>
                    <video src={`img/video.mp4#t=,3`} controls style={{width: '30%', height: '50%'}} />
                    </div>
                    
                    <audio src={`img/audio.mp3#t=33,37`} controls autoPlay />

                <h2 style={{estiloTabla}}>Nuestros Articulos</h2>
                    {Object.keys(this.state.articulos).map(articulo => (
                        <ul style={{background:'blue', width: '30%', position:'inherit'}}>
                                
                            <Articulo
                                informacion={this.state.articulos[articulo]}
                                key={articulo}
                            />
                        </ul>
                        
                    ))}           
            </div>
        );
    }
}

export default Articulos;