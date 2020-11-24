import * as React from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

type Posts = {
	userId: number;
	id: number;
	title: string;
	body: string;
	author: string;
};

type BlogState = {
	posts: Posts[];
};

class Blog extends React.Component<{}, BlogState> {
	state: BlogState = {
		posts: [],
	};

	componentDidMount() {
		axios
			.get<Posts[]>("https://jsonplaceholder.typicode.com/posts")
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
			return <Post key={post.id} title={post.title} author={post.author} />;
		});

		return (
			<div>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-posts">New Post</a></li>
                        </ul>
                    </nav>
                </header>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
