import React from 'react';
import {Link} from 'react-router-dom';

const Articulo = (props) => {
    const {nombre, _id, tipo} = props.informacion;
    const userTipo = props.userTipo; 
    return (
        <div className="col 3">
            <div className="card center">
            <p style={{fontSize:'20px', paddingLeft:'10px'}}>{nombre}</p>
                { tipo === 'Video' ? 
                    <img src={`img/video-icon.jpg`} alt={nombre} style={{width:'200px', height:'220px'}}/>
                    :
                    <img src={`img/pdf-icon.png`} alt={nombre} style={{width:'200px', height:'220px'}} />
                }
                {
                    userTipo === 'Cliente' ?
                        <div className="card-content">
                            <Link to={`/articulo/${_id}`} className="btn">Más Información</Link>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    );
};

export default Articulo;