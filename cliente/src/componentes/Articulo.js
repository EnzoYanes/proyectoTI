import React from 'react';
import {Link} from 'react-router-dom';

const Articulo = (props) => {
    const {imagen, nombre, precio, id} = props.informacion;
    return (
        <li>
            <img src={`img/${imagen}.png`} alt={nombre} />
            <p>{nombre} <span> $ {precio}</span></p>
            <Link to={`/articulo/${id}`} className="btn">Más Información</Link>
        </li>
    );
};

export default Articulo;