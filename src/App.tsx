import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Blog from "./containers/Blog/Blog";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Blog />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
