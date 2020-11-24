import * as React from "react";
import { Route, NavLink } from "react-router-dom";
import Posts from "../Posts/Posts";
import NewPost from "../NewPost/NewPost";
import FullPosts from "../FullPost/FullPost";
import "./Blog.css";

class Blog extends React.Component {
	render() {
		return (
			<div>
				<header>
					<nav>
						<ul>
							<li>
								<NavLink to={"/"} exact activeClassName={"my-active"}>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true",
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Route path={"/"} exact component={Posts} />
				<Route path={"/new-post"} component={NewPost} />
				<Route path={"/:id"} component={FullPosts} />
			</div>
		);
	}
}

export default Blog;
