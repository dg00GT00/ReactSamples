import * as React from "react";

import "./Post.css";

type PostsProps = {
    title: string;
    author: string;
};

const post: React.FunctionComponent<PostsProps> = (props) => (
	<article className="Post">
		<h1>{props.title}</h1>
		<div className="Info">
			<div className="Author">{props.author}</div>
		</div>
	</article>
);

export default post;
