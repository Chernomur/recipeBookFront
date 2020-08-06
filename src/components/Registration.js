import React from "react";
import axios from "api/axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { storage } from "utils";
import { singInUser } from "store/main/actions";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      serverMessage: null
    };
  }

  registrationClick = async () => {
    try {
      const response = await axios.post(`${axios.defaults.baseURL}/auth/singUp`,
        {
          fullName: this.state.fullName,
          email: this.state.email,
          password: this.state.password
        });
      // { headers: this.headers });

      this.setState({ serverMessage: "Registration complete" });
      storage.token.set(response.token);
      this.props.singInUser(response.user);
    } catch (e) {
      this.setState({ serverMessage: e.response.data });
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
        {(this.state.serverMessage !== "Registration complete") &&
        <RegistrationContainer className="card">
          FullName:
          <input
            value={this.state.fullName}
            onChange={this.changeFullName}
          />

          Email:
          <input
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
            onClick={this.registrationClick}
          >
            Register
          </button>
        </RegistrationContainer>}
        {this.state.serverMessage &&
        <div className="card">
          {this.state.serverMessage}
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

Registration.propTypes = {
  singInUser: PropTypes.func.isRequired
};

const connectFunction = connect(
  null, {
    singInUser
  }
);

export default connectFunction(Registration);
