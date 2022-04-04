import React from "react";


const Item = props => {
    return (
        <li className={`Item${props.isCompleted ? " completed" : ""}`} >
            <span>{props.content}</span>
            <button onClick={() => props.completeItem(props.index)} className="Item done">Hecho</button>
            <button onClick={() => props.itemDelete(props.index)} className="Item delete">Borrar</button>
        </li>
    );
};

export default Item;
