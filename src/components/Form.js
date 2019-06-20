import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Form.css';

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // Validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // Validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: null,
      lastName: null,
      email: null,
      jobTitle: null,
      birthday: null,
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        birthday: ''
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    // Get Todays date
    let TODAY = new Date().toISOString().slice(0, 10);

    // Get Valid Date to meet age requirement
    let validAge = new Date(
      new Date(TODAY).getFullYear() -
        18 +
        '-' +
        new Date(TODAY).getMonth() +
        '-' +
        new Date(TODAY).getDate()
    )
      .toISOString()
      .slice(0, 10);
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address';
        break;
      case 'birthday':
        formErrors.birthday =
          value < validAge ? '' : 'Must be 18 Years or Older';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {});
  };

  handleSubmit = event => {
    event.preventDefault();

    if (formValid(this.state)) {
      axios
        .post('http://localhost:3000/users', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          jobTitle: this.state.jobTitle,
          birthday: this.state.birthday
        })
        .then(res => {
          this.setState({ res });
          alert('User Created');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Please make sure all fields are filled out correctly');
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? 'error' : null}
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? 'error' : null}
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={formErrors.email.length > 0 ? 'error' : null}
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="jobTitle">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                className=""
                name="jobTitle"
                onChange={this.handleChange}
                placeholder="Job Title"
              />
            </div>

            <div className="birthday">
              <label htmlFor="birthday">Date of Birth</label>
              <input
                type="date"
                className={formErrors.birthday.length > 0 ? 'error' : null}
                name="birthday"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.birthday.length > 0 && (
                <span className="errorMessage">{formErrors.birthday}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Form;
