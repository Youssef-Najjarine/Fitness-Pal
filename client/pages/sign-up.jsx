import React from 'react';
import ClientError from '../../server/client-error';
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const newAccount = { firstName, lastName, email, password };
    if (!firstName || !lastName || !email || !password) {
      throw new ClientError(400, 'Please enter a valid first name, last name, email, and password.');
    } else {

      fetch('/api/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAccount)
      })
        .then(response => response.json())
        .then(newAccount => { })
        .catch(error => {
          console.error('Error:', error);
        });

      window.location.hash = '#calendar?dayId=1';
    }
  }

  handleChange(event) {
    const value = event.target.value;

    const name = event.target.name;

    this.setState({ [name]: value });

  }

  render() {
    return (
      <main className='sign-up-sign-in'>
        <h2>Sign Up</h2>
        <form className='sign-up-sign-in-form' onSubmit={this.handleSubmit}>
      <div className="full-name">
          <input
            placeholder='First Name...'
            required
              className="sign-up-sign-in-first-name"
              id="sign-up-firstName"
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
          />

          <input
            placeholder='Last Name...'
            required
              className="sign-up-sign-in-last-name"
              id="sign-up-lastName"
              name="lastName"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
      </div>
      <div>
          <input
            placeholder='Email...'
            required
            className="sign-up-sign-in-email"
            id="sign-up-email"
            name="email"
            type="text"
            onChange={this.handleChange}
            value={this.state.email}
          />
      </div>
      <div>
          <input
            placeholder='Password...'
            required
            className="sign-up-sign-in-password"
            id="sign-up-email"
            name="password"
            type="text"
            onChange={this.handleChange}
            value={this.state.password}
          />
      </div>
          <div className="sign-up-sign-in-cancel-submit">
            <a href="#calendar?dayId=1">Cancel</a>
            <button>Create Account</button>
          </div>
        </form>
      </main>
    );
  }
}
