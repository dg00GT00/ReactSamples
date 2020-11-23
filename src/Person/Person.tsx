import * as React from "react";

const person: React.FunctionComponent<{ name: string; age: number }> = (
	props
) => {
	return (
		<React.Fragment>
			<p>
				I'm {props.name} and I'm {props.age} years old!
			</p>
			<p>{props.children}</p>
		</React.Fragment>
	);
};

export default person;
