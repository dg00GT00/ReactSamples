import * as React from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import { RouteComponentProps, Link } from "react-router-dom";

type BlogState = {
	posts: PostsType[];
	author: string;
};

type PostsType = {
	userId: number;
	id: number;
	title: string;
	body: string;
	author: string;
};

class Posts extends React.Component<RouteComponentProps, BlogState> {
	state: BlogState = {
		posts: [],
		author: "",
	};

	componentDidMount() {
		axios
			.get<PostsType[]>("/posts")
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author: "Gledson",
					};
				});
				this.setState({ posts: updatedPosts });
			});
	}

	render() {
		const posts = this.state.posts.map((post) => {
			return (
				<Link to={"/" + post.id} key={post.id}>
					<Post title={post.title} author={post.author} body={post.body} />
				</Link>
			);
		});

		return <section className="Posts">{posts}</section>;
	}
}

export default Posts;
