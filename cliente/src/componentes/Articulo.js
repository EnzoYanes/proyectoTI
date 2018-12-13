import React from 'react';
import {Link} from 'react-router-dom';

const Articulo = (props) => {
    const {nombre, _id, tipo} = props.informacion;
    return (
        <div className="col 3">
            <div className="card center">
            <p style={{fontSize:'20px', paddingLeft:'10px'}}>{nombre}</p>
                { tipo === 'Video' ? 
                    <img src={`video-icon.jpg`} alt={nombre} style={{width:'200px', height:'220px'}}/>
                    :
                    <img src={`pdf-icon.png`} alt={nombre} style={{width:'200px', height:'220px'}} />
                }
                <div className="card-content">
                    <Link to={`/articulo/${_id}`} className="btn">Más Información</Link>
                </div>
            </div>
        </div>
    );
};

export default Articulo;