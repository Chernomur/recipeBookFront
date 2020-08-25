import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { singIn } from "api/authApi";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { storage } from "utils";
import { updateUser } from "store/main/actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    errorField: null,
  };

  singInClick = async (event) => {
    event.preventDefault();
    try {
      const response = await singIn({
        email: this.state.email,
        password: this.state.password,
      });
      this.setState({ errorMessage: "Login complete" });
      storage.token.set(response.token);

      this.props.updateUser(response.user);
    } catch (e) {
      this.setState({ errorMessage: e.response.data.message });
      this.setState({ errorField: e.response.data.field });
    }
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        {this.state.errorMessage !== "Login complete" && (
          <LoginForm onSubmit={this.singInClick} className="card">
            <TextField
              error={this.state.errorField === "email"}
              label="Email"
              helperText={
                this.state.errorField === "email" ? this.state.errorMessage : ""
              }
              className="text-field"
              onChange={this.onInputChange}
              name="email"
            />

            <TextField
              error={this.state.errorField === "password"}
              label="Password"
              helperText={
                this.state.errorField === "password"
                  ? this.state.errorMessage
                  : ""
              }
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
            >
              login
            </Button>
            <NavLink className="reg-link" to={"registration"}>
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
    margin: 15px auto 5px;
    width: 120px;
  }

  .reg-link {
    margin: 10px;
  }
`;

Login.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
  }),
  { updateUser }
);

export default connectFunction(Login);
