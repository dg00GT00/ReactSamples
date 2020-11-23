import * as React from "react";
import styles from "./Person.module.css";

type PersonProps = {
	name: string;
	age: number;
	click: () => void;
	changed: React.ChangeEventHandler<HTMLInputElement>;
};

const person: React.FunctionComponent<PersonProps> = (props) => {
	const rnd = Math.random();

	if (rnd > 0.7) {
		throw new Error("Something went wrong");
    }
    
	return (
		<React.Fragment>
			<p onClick={props.click} className={styles.Person}>
				I'm {props.name} and I'm {props.age} years old!
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</React.Fragment>
	);
};

export default person;
