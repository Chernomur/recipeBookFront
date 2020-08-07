import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { storage } from "utils";
import { singInUser } from "store/main/actions";
import axios from "api/axios";

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    serverMessage: null
  }

  singInClick = async (event) => {
    event.preventDefault();
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
      this.setState({ serverMessage: e.response.data });
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.props.user.id) {
      // eslint-disable-next-line react/prop-types
      this.props.history.push("/profile");
    }
    return (
      <>

        {(this.state.serverMessage !== "Login complete") && (
          <LoginForm
            onSubmit={this.singInClick}
            className="card">
            <TextField
              error={this.state.serverMessage === "Not Found"}
              label={(this.state.serverMessage === "Not Found" && "неверный логин") || "Login"}
              className="text-field"
              onChange={this.onInputChange}
              name="email"
            />

            <TextField
              error={this.state.serverMessage === "invalid password"}
              label={(this.state.serverMessage === "invalid password" && "неверный пароль") || "Password"}
              className="text-field"
              name="password"
              onChange={this.onInputChange}
              type="password"
              autoComplete="current-password"
            />

            <Button
              className="login-button"
              variant="contained"
              color="primary"
              type="submit"
              value="login"
            > login</Button>
            <NavLink to={" registration"}>
              Registration
            </NavLink>
          </LoginForm>
        )}
      </>
    );
  }
}

const LoginForm = styled.form`

 .text-field {
   margin: 5px auto;
   max-width: 250px;
 }
 
 .login-button {
  margin: auto;
  width: 120px;
 }
 
`;

Login.propTypes = {
  singInUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user
  }),
  { singInUser }
);

export default connectFunction(Login);
