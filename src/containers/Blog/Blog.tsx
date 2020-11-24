import * as React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Posts from "../Posts/Posts";
import NewPost from "../NewPost/NewPost";
import FullPosts from "../FullPost/FullPost";
import { PostParams } from "../../Route/Params/PostParams";
import "./Blog.css";

const postParams: PostParams = { id: "id" };
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
				<Switch>
					<Route path={"/"} exact component={Posts} />
					<Route path={"/new-post"} component={NewPost} />
					<Route path={"/:" + postParams.id} exact component={FullPosts} />
				</Switch>
			</div>
		);
	}
}

export default Blog;
