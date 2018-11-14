import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { user } = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);
        this.setState({ text: '' });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { errors, text } = this.state;

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card mt-4">
                        <div className="card-content">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-field">
                                    <span className="helper-text">Say something...</span>
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
                                        Submit
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
