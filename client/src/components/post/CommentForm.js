import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addComment(postId, newComment);
        this.setState({ text: '' });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { errors, text } = this.state;

        return (<div className="row">
            <div className="col s12">
                <div className="card mt-4">
                    <div className="card-content">
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <span className="helper-text">Add a Comment</span>
                                <textarea
                                    style={{ minHeight: '100px' }}
                                    placeholder="Create a post"
                                    name="text"
                                    value={text}
                                    onChange={this.onChange}
                                    className="materialize-textarea"></textarea>
                                {errors.text ? <span className="helper-text error">{errors.text}</span> : null}
                            </div>
                            <div className="input-field mt-4 text-center">
                                <button
                                    type="submit"
                                    className="waves-effect waves-light btn green">
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
