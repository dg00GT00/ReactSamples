import * as React from "react";

import "./NewPost.css";

type NewPostState = {
	title: string;
	content: string;
	author: string;
};

class NewPost extends React.Component<{}, NewPostState> {
	state: NewPostState = {
		title: "",
		content: "",
		author: "Max",
	};

	render() {
		return (
			<div className="NewPost">
				<h1>Add a Post</h1>
				<label>Title</label>
				<input
					type="text"
					value={this.state.title}
					onChange={(event) => this.setState({ title: event.target.value })}
				/>
				<label>Content</label>
				<textarea
					rows={4}
					value={this.state.content}
					onChange={(event) => this.setState({ content: event.target.value })}
				/>
				<label>Author</label>
				<select
					value={this.state.author}
					onChange={(event) => this.setState({ author: event.target.value })}
				>
					<option value="Max">Max</option>
					<option value="Manu">Manu</option>
				</select>
				<button>Add Post</button>
			</div>
		);
	}
}

export default NewPost;
