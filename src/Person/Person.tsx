import * as React from "react";

type PersonProps = {
	name: string;
	age: number;
	click: () => void;
	changed: React.ChangeEventHandler<HTMLInputElement>;
};

const person: React.FunctionComponent<PersonProps> = (props) => {
	return (
		<React.Fragment>
			<p onClick={props.click}>
				I'm {props.name} and I'm {props.age} years old!
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</React.Fragment>
	);
};

export default person;
