import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

    onDeleteClick(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }

    render() {

        const { comment, postId, auth } = this.props;

        return (
            <div className="card mb-3">
                <div className="card-content">
                    <div className="row">
                        <div className="col s2 text-center">
                            
                                <img
                                    className="responsive-img circle"
                                    src={comment.avatar}
                                    style={{height:'80px'}}
                                    alt=""
                                />
                            
                            <br />
                            <h6 className="text-center">{comment.name}</h6>
                        </div>
                        <div className="col s10">
                            <h6 className="lead">{comment.text}</h6>
                            {comment.user === auth.user.id ? (
                                <button
                                    onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                                    type="button"
                                    style={{float:'right'}}
                                    className="btn red mr-1"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
