import React from "react";
import './Card2.css';

export const Card2 = (props) => (
<div className='card'>
<div className='card-header'style={{backgroundColor: "lightblue"}}>{props.coin}</div>
<div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.text}</p>
    <a href={props.url} className="card-link text-muted" target='_blank'>Read More</a>
  </div>
</div>
);