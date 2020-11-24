import React from "react";

import "./Card.css";

const Card: React.FunctionComponent = (props) => {
	return <div className="card">{props.children}</div>;
};

export default Card;
