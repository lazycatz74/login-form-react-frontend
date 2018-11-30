import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    username: '',
    password: '',
    isValidate: null,
  };

  fetchUsersDataFromBackend = () =>
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));

  onValueChange = (key, event) =>
    this.setState({ [key]: event.target.value });

  onLoginSubmit = (event, username, password) => {

    this.fetchUsersDataFromBackend();

    let users = this.state.users;

    users = users.filter(user =>
      user.username === username && user.password === password
    );

    this.setState({
      isValidate: true && users.length !== 0,
      users: []
    });

    event.preventDefault();
  }

  render() {

    const {
      users,
      username,
      password,
      isValidate
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>This is a log in portal</h1>
        </header>
        <form onSubmit={(event) => this.onLoginSubmit(event, username, password)}>
          <div className="login-window">
            <div className="login-section">
              <h5>Username:</h5>
              <input
                type="text"
                id="login-username"
                onChange={(event) => this.onValueChange('username', event)}
                value={username}
              >
              </input>
            </div>
            <div className="login-section">
              <h5>Password:</h5>
              <input
                type="password"
                id="login-password"
                onChange={(event) => this.onValueChange('password', event)}
                value={password}
              >
              </input>
            </div>
            {!(isValidate || isValidate === null) &&
              <h5>Wrong password, please try again!</h5>
            }
            <button id="login-button">Login</button>
          </div>
          <div>
            <h5>Your username: {username}</h5>
          </div>
          <div>
            <h5>Your password: {password}</h5>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
