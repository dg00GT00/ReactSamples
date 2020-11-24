import * as React from 'react';

import './FullPost.css';

class FullPost extends React.Component {
    render () {
        let post = <p>Please select a Post!</p>;
        post = (
            <div className="FullPost">
                <h1>Title</h1>
                <p>Content</p>
                <div className="Edit">
                    <button className="Delete">Delete</button>
                </div>
            </div>

        );
        return post;
    }
}

export default FullPost;