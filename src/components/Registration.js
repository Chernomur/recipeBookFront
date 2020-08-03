import React from "react";
import axios from "axios";

import styled from "styled-components";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      res: null
    };
  }

  registrationClick = async () => {
    try {
      const response = await axios.post("http://192.168.0.108:3000/auth/singUp",
        {
          fullName: this.state.fullName,
          email: this.state.email,
          password: this.state.password
        },
        { headers: this.headers });

      // console.log("👉 Returned data:", response);
      if (!response.data.token) {
        this.setState({ res: response.data });
      } else {
        this.setState({ res: "Registration complete" });
      }
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
    }
  }

  changeFullName = (event) => {
    this.setState({ fullName: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div>
        {(this.state.res !== "Registration complete") &&
        <RegistrationContainer className="card">
          FullName:
          <input
            type="text"
            value={this.state.fullName}
            onChange={this.changeFullName}
          />

          Email:
          <input
            type="email"
            value={this.state.email}
            onChange={this.changeEmail}/>

          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.changePassword}/>

          Password confirmation:
          <input
            type="password"
            value={this.state.password}/>

          <button
            onClick={this.registrationClick}>
            Register
          </button>
        </RegistrationContainer>}
        {this.state.res && <div className="card">
          {this.state.res}
        </div>}
      </div>

    );
  }
}

const RegistrationContainer = styled.div`
          div{
          margin: 10px;
          }
          input{
          margin: auto;
          max-width: 250px;
          }
          `;

export default Registration;
