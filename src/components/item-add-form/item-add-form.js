import React from "react";
import './item-add-form.css';

const ItemAddForm = ({onItemAdd}) => {
    return (
        <div className="item-add-form">
            <button
                className="btn btn-outline-secondary mt-2"
                onClick={() => onItemAdd("Add item")}>
                Add item
            </button>
        </div>
    )
}

export default ItemAddForm;