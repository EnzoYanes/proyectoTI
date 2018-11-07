import React from 'react';
import {Link} from 'react-router-dom';

const Articulo = (props) => {
    const {nombre, _id} = props.informacion;
    return (
        <li>
            <img src={`img/camisa_8.png`} alt={nombre} />
            <p>{nombre}</p>
            <Link to={`/articulo/${_id}`} className="btn">Más Información</Link>
        </li>
    );
};

export default Articulo;