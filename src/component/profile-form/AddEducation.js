import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = React.useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = React.useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history);
            }} className="form">
                <div className="form-group">
                    <input type="text" placeholder="* school or bootcamp" name="school" value={school}  onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of study" onChange={e => onChange(e)} value={fieldofstudy} name="fieldofstudy"/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" onChange={e => onChange(e)} value={from} name="from"/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e => {
                        setFormData({...formData, current: !current});
                        toggleDisabled(!toDateDisabled)
                    }} value={current}/> {' '} Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" onChange={e => onChange(e)} value={to} disabled={toDateDisabled ? 'disabled' : ''} name="to"/>
                </div>
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              onChange={e => onChange(e)}
              value={description}
          ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>

    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, {addEducation}) (withRouter(AddEducation));