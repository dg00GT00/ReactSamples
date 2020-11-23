import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary"

type NameState = {
	persons: { name: string; age: number }[];
	showPersons: boolean;
};

class App extends React.Component<{}, NameState> {
	state: NameState = {
		persons: [
			{ name: "Gledson", age: 23 },
			{ name: "Michelle", age: 43 },
			{ name: "Ritall", age: 64 },
		],
		showPersons: false,
	};

	nameChangedHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number
	): void => {
		this.setState({
			persons: [
				{ name: "Gledson", age: 23 },
				{ name: "Michelle", age: 43 },
				{ name: e.target.value, age: 64 },
			],
		});
	};

	togglePersonHandler = (): void => {
		const doesShow = this.state.showPersons;
		this.setState({
			showPersons: !doesShow,
		});
	};

	deletePersonHandler = (index: number): void => {
		// Need to create a copy before updating the state
		const persons = [...this.state.persons];
		persons.splice(index, 1);
		this.setState({ persons });
	};

	render(): JSX.Element {
		const style = {
			backgroundColor: "green",
			color: "white",
			font: "inherit",
			border: "1px solid blue",
			padding: "8px",
			cursor: "pointer",
		};

		let persons = null;

		if (this.state.showPersons) {
            style.backgroundColor = "red";
            
			persons = (
				<ErrorBoundary>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								key={index}
								name={person.name}
								age={person.age}
								click={this.deletePersonHandler.bind(this, index)}
								changed={(e) => this.nameChangedHandler(e, index)}
							>
								With this hobbies
							</Person>
						);
					})}
				</ErrorBoundary>
			);
		}

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<button onClick={this.togglePersonHandler} style={style}>
						Switch name
					</button>
					{persons}
				</header>
			</div>
		);
	}
}

export default App;
