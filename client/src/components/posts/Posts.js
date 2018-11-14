import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

//Components
import PostForm from './PostForm';
import PostFeed from './PostFeed';

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {

        const { posts, loading } = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner />;
        } else {
            postContent = <PostFeed posts={posts} />;
        }

        return (
            <div className="roe">
                <div className="col s12">
                    <PostForm />
                    {postContent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
