import React, { Component } from 'react';
import './Form.css';

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? 'minimum 3 characters required'
            : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? 'minimum 3 characters required'
            : '';
        break;
      case 'email':
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ''
            : 'Invalid email address';
        break;
      case 'birthday':
        formErrors.birthday =
          value.length < 3 && value.length > 0
            ? 'minimum 3 characters required'
            : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = event => {
    event.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`
      --SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Birthday: ${this.state.birthday}
      `);
    } else {
      console.error('FROM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="form-group m-sm">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                placeholder="Job Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                onChange={this.handleChange}
                noValidate
              />
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
