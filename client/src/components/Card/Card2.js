import React from "react";

export const Card2 = (props) => (
<div className='card'>
<div className='card-header bg-secondary'>{props.coin}</div>
<div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.text}</p>
  </div>
</div>
);
