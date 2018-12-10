import React from 'react';
import {Link} from 'react-router-dom';

const ArticuloProveedor = (props) => {
    const {nombre, _id} = props.informacion;
    return (
        <div className="col 3">
            <div className="card">
                <img src={`img/camisa_8.png`} alt={nombre} />
                <div className="card-content">
                    <p>{nombre}</p>
                    <Link to={`/estadisticasRecurso/${_id}`} className="btn">Estadísticas</Link>
                    <Link to={`/editarRecurso/${_id}`} className="btn">Editar</Link>
                </div>
            </div>
        </div>
    );
};

export default ArticuloProveedor;