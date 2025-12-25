import React, { Component } from "react";
import axios from "axios";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedin: false,
      data: null
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    if (this.state.logedin) {
      this.setState({ logedin: false, data: null });
    } else {
      axios.post(
        "/users/",                                   // <-- API endpoint
        {
          email: "testtwo@test.com",                 // <-- JSON body (no stringify)
          password: "testpassword"
        },
        {
          headers: {
            "Content-Type": "application/json"       // <-- correct header
          }
        }
      )
      .then(response => {
        console.log("Login Success:", response.data);
        this.setState({
          logedin: true,
          data: response.data.data || response.data  // <-- show response data
        });
      })
      .catch(error => {
        console.log("Login Error:", error.response?.data || error);
        alert("Authentication Failed");
      });
    }
  }

  render() {
    const { logedin, data } = this.state;

    return (
      <div className="App">
        {logedin ? (
          <div className="logged">
            <h1>Logged In</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button className="button" onClick={this.fetchUser}>Logout</button>
          </div>
        ) : (
          <div className="unlogged">
            <h1>Email: testtwo@test.com</h1>
            <h1>Password: testpassword</h1>
            <button className="button" onClick={this.fetchUser}>Login</button>
          </div>
        )}
      </div>
    );
  }
}

export default hot(module)(App);
