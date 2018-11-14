import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick = (event, id) => {
        this.props.deleteEducation(id);
    }

    render() {

        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                        )}
                </td>
                <td>
                    <button
                        onClick={(event) => this.onDeleteClick(event, edu._id)}
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
                                <span className="card-title">Education Information</span>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>School/College</th>
                                            <th>Degree</th>
                                            <th>Years</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {education}
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

export default connect(null, { deleteEducation })(Education);
