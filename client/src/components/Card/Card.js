import React from "react";

export const Card = (props) => (
  <div className="card mt-5">
    <div className="card-header" style={{backgroundColor: 'powderblue'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
