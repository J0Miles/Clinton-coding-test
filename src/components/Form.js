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
      user: {
        email: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        birthday: '',
        formErrors: {
          firstName: '',
          lastName: '',
          email: '',
          birthday: ''
        }
      },
      submitted: false
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    console.log('Name: ', name);
    console.log('Value: ', value);

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
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className=""
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className=""
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className=""
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="jobTitle">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                className=""
                name="jobTitle"
                placeholder="Job Title"
              />
            </div>
            <div className="birthday">
              <label htmlFor="birthday">Date of Birth</label>
              <input
                type="date"
                className=""
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
