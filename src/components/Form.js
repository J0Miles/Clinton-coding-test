import React, { Component } from 'react';
import './Form.css';

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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
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
          <form onSubmit={this.handleSubmit} validate>
            <h1>Create Account</h1>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange}
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
