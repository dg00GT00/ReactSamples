import * as React from "react";
import "./Blog.css";

class Blog extends React.Component {
	render() {
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
			</div>
		);
	}
}

export default Blog;
