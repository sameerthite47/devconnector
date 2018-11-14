import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
    }

    //onChange
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }//onChange

    //onCheck
    onCheck = (event) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }//onCheck

    //componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }//componentWillReceiveProps

    //onSubmit
    onSubmit = (event) => {
        event.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addExperience(expData, this.props.history);
    }//onSubmit

    render() {

        const { company, title, location, from, to, current, description, errors, disabled } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <Link to="/dashboard" className="waves-effect waves-light btn white btn-login mt-2">Go back</Link>
                        <div className="card register-card">
                            <div className="card-content">
                                <span className="card-title">Add Experience</span>
                                <p className="text-center">Add your professional experience</p>
                                <form noValidate className="row" onSubmit={this.onSubmit}>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Company *"
                                            type="text"
                                            name="company"
                                            value={company}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.company ? <span className="helper-text error">{errors.company}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Job title *"
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.title ? <span className="helper-text error">{errors.title}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Location"
                                            type="text"
                                            name="location"
                                            value={location}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.location ? <span className="helper-text error">{errors.location}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <span className="helper-text">From Date *</span>
                                        <input
                                            placeholder="From Date"
                                            type="date"
                                            name="from"
                                            value={from}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.from ? <span className="helper-text error">{errors.from}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <span className="helper-text">To Date</span>
                                        <input
                                            placeholder="To Date"
                                            type="date"
                                            name="to"
                                            value={to}
                                            disabled={disabled}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.to ? <span className="helper-text error">{errors.to}</span> : null}
                                    </div>

                                    <div className="input-field col s12" style={{ marginBottom: '40px' }}>
                                        <label>
                                            <input type="checkbox" checked={current} onChange={this.onCheck} />
                                            <span>Current</span>
                                        </label>
                                    </div>

                                    <div className="input-field col s12">
                                        <textarea
                                            placeholder="Job Description"
                                            name="description"
                                            value={description}
                                            onChange={this.onChange}
                                            className="materialize-textarea"></textarea>
                                        {errors.description ? <span className="helper-text error">{errors.description}</span> : null}
                                    </div>

                                    <div className="input-field col s12 text-center mt-4">
                                        <button
                                            type="submit"
                                            className="waves-effect waves-light btn green">
                                            Save
                                         </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
    withRouter(AddExperience)
);
