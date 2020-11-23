import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./Person/Person";

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

	nameChangedHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		this.setState({
			persons: [
				{ name: "Gledson", age: 23 },
				{ name: "Michelle", age: 43 },
				{ name: e.target.value, age: 64 },
			],
		});
	};

	switchHandler = (name: string) => {
		this.setState({
			persons: [
				{ name: "Gledson", age: 23 },
				{ name: "Michelle", age: 43 },
				{ name: name, age: 64 },
			],
		});
	};

	togglePersonHandler = (): void => {
		const doesShow = this.state.showPersons;
		this.setState({
			showPersons: !doesShow,
		});
	};

	render(): JSX.Element {
		const style = {
			backgroundColor: "white",
			font: "inherit",
			border: "1px solid blue",
			padding: "8px",
			cursor: "pointer",
        };
        
        let persons = null;
        
		if (this.state.showPersons) {
			persons = (
				<React.Fragment>
					<Person
						name={this.state.persons[1].name}
						age={31}
						click={this.switchHandler.bind(this, "Mary")}
						changed={this.nameChangedHandler}
					>
						With this hobbies
					</Person>
					<Person
						name={this.state.persons[2].name}
						age={31}
						click={this.switchHandler.bind(this, "Kate")}
						changed={this.nameChangedHandler}
					>
						With other hobbies
					</Person>
				</React.Fragment>
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
