import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { storage } from "utils";
import { singInUser } from "store/main/actions";
import axios from "api/axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      serverMessage: null
    };
  }

  singInClick = async () => {
    try {
      const response = await axios.post(`${axios.defaults.baseURL}/auth/singIn`,
        {
          email: this.state.email,
          password: this.state.password
        });
      this.setState({ serverMessage: "Login complete" });
      storage.token.set(response.token);

      this.props.singInUser(response.user);
    } catch (e) {
      this.setState({ serverMessage: e.response.statusText });
    }
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
        {((this.state.serverMessage !== "Login complete") &&
          (
            <LoginContainer className="card">

              Login:
              <input onChange={this.changeEmail}/>

              Password:
              <input
                onChange={this.changePassword}
                type="password"
              />

              <button
                onClick={this.singInClick}
              >
                singIn
              </button>

              <NavLink
                to={"registration"}
              >
                Registration
              </NavLink>
            </LoginContainer>
          ))}
        {
          this.state.serverMessage &&
          <div className="card">
            {this.state.serverMessage}
          </div>
        }
      </div>
    );
  }
}

const LoginContainer = styled.div`

  div{
    margin: 10px;
  }
  
  input{
    margin: auto;
    max-width: 250px;
  }
  
  button{
    margin: 10px auto 10px auto ;
    max-width: 250px;
  }
  
`;

Login.propTypes = {
  singInUser: PropTypes.func.isRequired
};

const connectFunction = connect(
  null, {
    singInUser
  }
);

export default connectFunction(Login);
