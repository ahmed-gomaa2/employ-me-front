import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = React.useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = React.useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form onSubmit={e => {
                e.preventDefault();
                addExperience(formData, history);
            }} className="form">
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title}  onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" onChange={e => onChange(e)} value={location} name="location"/>
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
              placeholder="Job Description"
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null, {addExperience}) (withRouter(AddExperience));