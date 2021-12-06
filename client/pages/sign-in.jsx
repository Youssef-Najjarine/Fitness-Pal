import React from 'react';
import ClientError from '../../server/client-error';
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'you@yahoo.com',
      password: 'apples'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const newAccount = { email, password };
    if (!email || !password) {
      throw new ClientError(400, 'Please enter a valid first name, last name, email, and password.');
    } else {
      fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAccount)
      })
        .then(response => response.json())
        .then(currentAccount => {
          const currentUser = {
            token: currentAccount.token,
            userId: currentAccount.user.userId,
            name: currentAccount.user.fullName
          };
          this.props.handleSignIn(currentUser);
        })
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
        <h2>Sign In</h2>
        <form className='sign-up-sign-in-form' onSubmit={this.handleSubmit}>
          <div>
            <input
              placeholder='Email...'
              required
              className="sign-up-sign-in-email"
              id="sign-up-email"
              name="email"
              type="email"
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
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div className="sign-up-sign-in-cancel-submit">
            <a href="#SignUpOrSignIn">Cancel</a>
            <button>Sign In</button>
          </div>
        </form>
      </main>
    );
  }
}
