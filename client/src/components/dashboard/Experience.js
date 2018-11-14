import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

    onDeleteClick = (event, id) => {
        this.props.deleteExperience(id);
      }

    render() {

        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                {exp.to === null ? (
                  ' Now'
                ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={(event) => this.onDeleteClick(event, exp._id)}
                  className="waves-effect waves-light btn red"
                >
                  Delete
                </button>
              </td>
            </tr>
          ));

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Professional Experience</span>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Job Title</th>
                                            <th>Years</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        { experience }    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { deleteExperience })(Experience);
