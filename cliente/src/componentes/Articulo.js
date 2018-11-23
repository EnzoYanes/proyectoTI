import React from 'react';
import {Link} from 'react-router-dom';

const Articulo = (props) => {
    const {nombre, _id} = props.informacion;
    return (
        <div className="col 3">
            <div className="card">
                <img src={`img/camisa_8.png`} alt={nombre} />
                <div className="card-content">
                    <p>{nombre}</p>
                    <Link to={`/articulo/${_id}`} className="btn">Más Información</Link>
                    <Link to={`/editarRecurso/${_id}`} className="btn">Editar</Link>
                </div>
            </div>
        </div>
    );
};

export default Articulo;