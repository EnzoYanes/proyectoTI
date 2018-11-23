import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Iframe from 'react-iframe'   
import axios from 'axios';

class ArticuloDetalle extends Component {

    constructor(props){
        super(props);
        this.state = {
            articulo: ''
        }
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
            console.log("FILE:  " + event.target.files[0])
            console.log("RESUL:  " + event.target.result)
            console.log("Probable ruta:  " + event.target.name)
        }
    }   

    componentWillMount(){
        this.getArticulo();
    }

    getArticulo = () => {
        const idArticulo = this.props.location.pathname.replace('/articulo/', '');
        fetch(`http://localhost:5000/api/recurso/${idArticulo}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articulo: data
                })
            })
    }

    obtenerRecurso = () => {
        const idRecurso = this.state.articulo._id;
        const idUser = this.state.idUser;
        axios.post(`http://localhost:5000/api/user/addRecurso/${this.state.idUser}`, {idRecurso});
        axios.post(`http://localhost:5000/api/recurso/addCliente/${idRecurso}`,{idUser});
        window.M.toast({html: 'Recurso obtenido'});
    }

    render() {
        //if(!props.articulo) return null;
        const {isAuthenticated} = this.props.auth;
       //lo que hace aca es tomar el valor pasado por parametro a la url.
       let idArticulo = "clic en la description " + this.props.location.pathname.replace('/articulo/', '');


        return (
            <div>
                { isAuthenticated() && (
                    <div>
                        <h4>Detalle del recurso</h4>
                        <img src={`../img/camisa_8.png`} alt={this.state.articulo.nombre} />
                        <p><b>Nombre:</b> {this.state.articulo.nombre}</p>
                        <p><b>Descripcion:</b> {this.state.articulo.descripcion}</p>
                        <p><b>Suscripcion:</b> {this.state.articulo.suscripcion}</p>
                        <button className="btn" onClick={this.obtenerRecurso}>Obtener</button>
                    </div>
                )}
                
                { !isAuthenticated() && (
                    <div>
                        <p>Para ver el contenido debes estar logueado</p>
                        <Link to="/login">Iniciar Sesión</Link>
                    </div>
                )}

{/*         <div>
                    //Aca tomo el valor del id que recupero de la url y se lo paso a una funcion 
                     <button onClick={() => this.conf(idArticulo)}>Presione aqui para confirmar Registro</button>
                     // Al pasar el mouse por arriba de este campo ejecuta una funcion la que nosotros queramos 
                     <button onMouseOver={() => this.conf("paso por aqui el mouse")}>Pasar mouse por arriba a ver que pasa</button>                

                </div>
                
                {/* <div>
                    
                    <video src={`/img/video.mp4`} controls style={{width: '30%', height: '50%'}} hidden = {false}/>

                </div>
                    <img src={`/img/MERN.png`} alt=""/>
                    <audio src={`/img/audio.mp3`} controls />
                    
                    <div>
                        <button onClick = { () => this.previewFile()} >Abrir</button>
                    </div>
                    <div></div>
                    <a href={'/img/Proyecto2018.pdf'} >Descargar pdf</a>
                   <button onClick={() => { window.open('/img/MERN.png', '_blank'); }} >Click to show</button>
           
           
            
            <div style={{paddingLeft:"300px", paddingTop:"50px"}} >
                   <Iframe 
                        url={this.state.url}
                        width="70%"
                        height="700px"
                        id="myId"
                        //className="myClassname"
                        //display="initial"
                        position="relative"
                        //allowFullScreen
                        
                        />
                        <br/><br/><br/>
                        <a className="btn" href="/img/Proyecto2018.pdf">Descargar</a>
                        <br/><br/><br/>

                    </div>
           </div>
            //    function openPDF(){
            //window.open("myurl/files/"+nombreArchivo+".pdf","_blank"); */}


            </div>
        );
    }
};

export default ArticuloDetalle;