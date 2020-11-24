import * as React from "react";
import { Route, Link } from "react-router-dom";
import Posts from "../Posts/Posts";
import NewPost from "../NewPost/NewPost";
import "./Blog.css";

class Blog extends React.Component {
	render() {
		return (
			<div>
				<header>
					<nav>
						<ul>
							<li>
								<Link to={"/"}>Home</Link>
							</li>
							<li>
								<Link
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true",
									}}
								>
									New Post
								</Link>
							</li>
						</ul>
					</nav>
				</header>
				<Route path={"/"} exact component={Posts} />
				<Route path={"/new-post"} component={NewPost} />
			</div>
		);
	}
}

export default Blog;
