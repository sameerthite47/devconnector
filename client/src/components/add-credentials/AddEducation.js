import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
    }//constructor

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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    }//onSubmit

    render() {

        const { school, degree, fieldofstudy, from, to, current, description, errors, disabled } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <Link to="/dashboard" className="waves-effect waves-light btn white btn-login mt-2">Go back</Link>
                        <div className="card register-card">
                            <div className="card-content">
                                <span className="card-title">Add Education</span>
                                <p className="text-center">Your school, college information</p>
                                <form noValidate className="row" onSubmit={this.onSubmit}>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="School/College *"
                                            type="text"
                                            name="school"
                                            value={school}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.school ? <span className="helper-text error">{errors.school}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Degree *"
                                            type="text"
                                            name="degree"
                                            value={degree}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.degree ? <span className="helper-text error">{errors.degree}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Field of Study *"
                                            type="text"
                                            name="fieldofstudy"
                                            value={fieldofstudy}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.fieldofstudy ? <span className="helper-text error">{errors.fieldofstudy}</span> : null}
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
                                            placeholder="Education Description"
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

export default connect(mapStateToProps, { addEducation })(
    withRouter(AddEducation)
);
