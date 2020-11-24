import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./Post.css";

type PostsProps = {
	title: string;
    author: string;
    body: string;
};

const post: React.FunctionComponent<
	RouteComponentProps<PostsProps> & PostsProps
> = (props) => {
	return (
		<article className="Post">
			<h1>{props.title}</h1>
			<div className="Info">
				<div className="Author">{props.author}</div>
			</div>
		</article>
	);
};

export default withRouter(post);
