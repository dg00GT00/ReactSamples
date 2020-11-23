import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./Person/Person";

type NameState = {
	persons: { name: string; age: number }[];
};

class App extends React.Component<{}, NameState> {
	state: NameState = {
		persons: [
			{ name: "Gledson", age: 23 },
			{ name: "Michelle", age: 43 },
			{ name: "Ritall", age: 64 },
		],
	};

	switchHandler = () => {
		this.setState({
			persons: [
				{ name: "Gledson", age: 23 },
				{ name: "Michelle", age: 43 },
				{ name: "Tonny", age: 64 },
			],
		});
	};

	render(): JSX.Element {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<button onClick={this.switchHandler}>Switch name</button>
					<Person name={this.state.persons[2].name} age={31}>
						With this hobbies
					</Person>
				</header>
			</div>
		);
	}
}

export default App;
