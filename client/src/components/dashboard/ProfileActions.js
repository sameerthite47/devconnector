import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div className="profile-action">
            <Link to="/edit-profile" className="waves-effect waves-light btn white">
                <i className="fa fa-user mr-2"></i>
                Edit Profile
        </Link>
            <Link to="/add-experience" className="waves-effect waves-light btn white">
                <i className="fa fa-briefcase mr-2"></i>
                Add Experience
        </Link>
            <Link to="/add-education" className="waves-effect waves-light btn white">
                <i className="fa fa-user-graduate mr-2"></i>
                Add Education
        </Link>
        </div>
    )
}

export default ProfileActions
