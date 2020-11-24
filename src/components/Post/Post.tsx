import * as React from "react";

import "./Post.css";

const post: React.FunctionComponent = (props) => (
	<article className="Post">
		<h1>Title</h1>
		<div className="Info">
			<div className="Author">Author</div>
		</div>
	</article>
);

export default post;
