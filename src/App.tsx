import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./Person/Person";

type NameState = {
	persons: { name: string; age: number }[];
};

const App = () => {
	const [personsStates, setPersonsState] = React.useState<NameState>({
		persons: [
			{ name: "Gledson", age: 23 },
			{ name: "Michelle", age: 43 },
			{ name: "Ritall", age: 64 },
		],
	});

	const switchHandler = (): void => {
		setPersonsState({
			persons: [
				{ name: "Gledson", age: 23 },
				{ name: "Michelle", age: 43 },
				{ name: "Tonny", age: 64 },
			],
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<button onClick={switchHandler}>Switch name</button>
				<Person name={personsStates.persons[2].name} age={31}>
					With this hobbies
				</Person>
			</header>
		</div>
	);
};

export default App;
