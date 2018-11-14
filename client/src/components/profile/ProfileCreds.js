import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
    render() {

        const { experience, education } = this.props;

        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item mb-4">
                <h5>{exp.company}</h5>
                <h6>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                        )}
                </h6>
                <h6>
                    <strong>Position:</strong> {exp.title}
                </h6>
                <h6>
                    {exp.location === '' ? null : (
                        <span>
                            <strong>Location: </strong> {exp.location}
                        </span>
                    )}
                </h6>
                <h6>
                    {exp.description === '' ? null : (
                        <span>
                            <strong>Description: </strong> {exp.description}
                        </span>
                    )}
                </h6>
            </li>
        ));

        const eduItems = education.map(edu => (
            <li key={edu._id} className="list-group-item mb-4">
              <h5>{edu.school}</h5>
              <h6>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? (
                  ' Now'
                ) : (
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
              </h6>
              <h6>
                <strong>Degree:</strong> {edu.degree}
              </h6>
              <h6>
                <strong>Field Of Study:</strong> {edu.fieldofstudy}
              </h6>
              <h6>
                {edu.description === '' ? null : (
                  <span>
                    <strong>Description: </strong> {edu.description}
                  </span>
                )}
              </h6>
            </li>
          ));

        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content">
                            <h4 className="text-center mt-0 mb-4">Experience</h4>
                            {
                                expItems.length > 0 ? (
                                    <ul className="list-group">{expItems}</ul>
                                ) : (
                                        <p className="text-center">No Experience Listed</p>
                                    )}
                        </div>
                    </div>
                </div>

                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content">
                            <h4 className="text-center mt-0 mb-4">Education</h4>
                            {eduItems.length > 0 ? (
                                <ul className="list-group">{eduItems}</ul>
                            ) : (
                                <p className="text-center">No Education Listed</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCreds
