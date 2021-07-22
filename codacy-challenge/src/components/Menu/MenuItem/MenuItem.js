import React from 'react';
import './MenuItem.css';

const MenuItem = (props) => {
    return (
        <div className="MenuItem">
            <img className="IconMenu" src={props.imgSrc} alt="" />
            <span className="LabelIcon">{props.label}</span>
        </div>
    )
}

export default MenuItem;