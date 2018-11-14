import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            youtube: '',
            errors: {}
        }
    }//constructor

    //onChange
    onChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }//onChange

    //onSubmit
    onSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
          };
      
          this.props.createProfile(profileData, this.props.history);
    }//onSubmit

    //componentDidMount
    componentDidMount() {
        this.props.getCurrentProfile();
    }//componentDidMount

    //componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
      
            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');
      
            // If profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername)
              ? profile.githubusername
              : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
              ? profile.social.twitter
              : '';
            profile.facebook = !isEmpty(profile.social.facebook)
              ? profile.social.facebook
              : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
              ? profile.social.linkedin
              : '';
            profile.youtube = !isEmpty(profile.social.youtube)
              ? profile.social.youtube
              : '';
            profile.instagram = !isEmpty(profile.social.instagram)
              ? profile.social.instagram
              : '';
      
            // Set component fields state
            this.setState({
              handle: profile.handle,
              company: profile.company,
              website: profile.website,
              location: profile.location,
              status: profile.status,
              skills: skillsCSV,
              githubusername: profile.githubusername,
              bio: profile.bio,
              twitter: profile.twitter,
              facebook: profile.facebook,
              linkedin: profile.linkedin,
              youtube: profile.youtube
            });
          }
    }//componentWillReceiveProps

    render() {

        const { displaySocialInputs, handle, company, website, location, status, skills, githubusername, bio,
            twitter, facebook, linkedin, instagram, youtube, errors } = this.state;

        // Select options for status
        const options = [
            { label: 'Select Professional Status *', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = <div>
                <div className="input-field col s12">
                    <i className="material-icons prefix fab fa-facebook"></i>
                    <input
                        name="facebook"
                        type="text"
                        placeholder="Facebook Profile URL"
                        value={facebook}
                        onChange={this.onChange}
                        className="validate" />
                </div>

                <div className="input-field col s12">
                    <i className="material-icons prefix fab fa-twitter"></i>
                    <input
                        name="twitter"
                        type="text"
                        placeholder="Twitter Profile URL"
                        value={twitter}
                        onChange={this.onChange}
                        className="validate" />
                </div>

                <div className="input-field col s12">
                    <i className="material-icons prefix fab fa-youtube"></i>
                    <input
                        name="youtube"
                        type="text"
                        placeholder="Youtube Profile URL"
                        value={youtube}
                        onChange={this.onChange}
                        className="validate" />
                </div>

                <div className="input-field col s12">
                    <i className="material-icons prefix fab fa-linkedin"></i>
                    <input
                        name="linkedin"
                        type="text"
                        placeholder="Linkedin Profile URL"
                        value={linkedin}
                        onChange={this.onChange}
                        className="validate" />
                </div>

                <div className="input-field col s12">
                    <i className="material-icons prefix fab fa-instagram"></i>
                    <input
                        name="instagram"
                        type="text"
                        placeholder="Instagram Profile URL"
                        value={instagram}
                        onChange={this.onChange}
                        className="validate" />
                </div>

            </div>
        }

        return (
            <div>
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <Link to="/dashboard" className="waves-effect waves-light btn white btn-login mt-2">Go back</Link>

                        <div className="card register-card">
                            <div className="card-content">
                                <span className="card-title">Edit Profile</span>
                                <form noValidate className="row" onSubmit={this.onSubmit}>
                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Profile Handle *"
                                            type="text"
                                            name="handle"
                                            value={handle}
                                            onChange={this.onChange}
                                            className="validate" />
                                        <span className="helper-text">A unique handle for your profile URL. Your full name, company name, nickname etc (without spaces)</span>
                                        {errors.handle ? <span className="helper-text error">{errors.handle}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <select className="select-status" name="status" value={status} onChange={this.onChange}>
                                            {
                                                options.map(item => {
                                                    return <option key={item.label} value={item.value}>{item.label}</option>
                                                })
                                            }
                                        </select>
                                        {errors.status ? <span className="helper-text error">{errors.status}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Company Name"
                                            type="text"
                                            name="company"
                                            value={company}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.company ? <span className="helper-text error">{errors.company}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Website"
                                            type="text"
                                            name="website"
                                            value={website}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.website ? <span className="helper-text error">{errors.website}</span> : null}
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
                                        <input
                                            placeholder="Skills *"
                                            type="text"
                                            name="skills"
                                            value={skills}
                                            onChange={this.onChange}
                                            className="validate" />
                                        <span className="helper-text">Please use comma separated values. (eg html, css, javascript )</span>
                                        {errors.skills ? <span className="helper-text error">{errors.skills}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <input
                                            placeholder="Github Username"
                                            type="text"
                                            name="githubusername"
                                            value={githubusername}
                                            onChange={this.onChange}
                                            className="validate" />
                                        {errors.githubusername ? <span className="helper-text error">{errors.githubusername}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <textarea
                                            placeholder="Your short bio"
                                            name="bio"
                                            value={bio}
                                            onChange={this.onChange}
                                            className="materialize-textarea"></textarea>
                                        {errors.githubusername ? <span className="helper-text error">{errors.githubusername}</span> : null}
                                    </div>

                                    <div className="input-field col s12">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                this.setState(prevState => ({
                                                    displaySocialInputs: !prevState.displaySocialInputs
                                                }));
                                            }}
                                            className="waves-effect waves-light btn white btn-login btn-small">Add Social Media Links</button>
                                    </div>

                                    {socialInputs}

                                    <div className="input-field col s12 text-center mt-2">
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

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
