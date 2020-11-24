import axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostParams } from "../../Route/Params/PostParams";
import "./FullPost.css";

type PostsType = {
	userId: number;
	id: number;
	title: string;
	body: string;
	author: string;
};

type FullPostState = {
	loadedPosts: PostsType;
};
class FullPost extends React.Component<
	RouteComponentProps<PostParams>,
	FullPostState
> {
	state: FullPostState = {
		loadedPosts: {
			id: 0,
			userId: 0,
			title: "",
			body: "",
			author: "",
		},
	};

	componentDidMount(): void {
		axios
			.get<PostsType>("/posts/" + this.props.match.params.id)
			.then((response) => {
				this.setState({ loadedPosts: response.data });
			});
	}

	render(): JSX.Element {
		return (
			<div className="FullPost">
				<h1>{this.state.loadedPosts.title}</h1>
				<p>{this.state.loadedPosts.body}</p>
				<div className="Edit">
					<button className="Delete">Delete</button>
				</div>
			</div>
		);
	}
}

export default FullPost;
