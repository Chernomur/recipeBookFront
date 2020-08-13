import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { storage } from "utils";
import { updateUser } from "store/main/actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { singUp } from "api/authApi";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errorMessage: null,
      errorField: null,
    };
  }

  registrationClick = async (event) => {
    event.preventDefault();
    if (this.state.passwordConfirm !== this.state.password) {
      this.setState({ errorMessage: "Password mismatch" });
      return;
    }
    try {
      const response = await singUp({
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
      });

      this.setState({ errorMessage: "Registration complete" });
      storage.token.set(response.token);
      this.props.updateUser(response.user);
    } catch (e) {
      // console.log(e);
      this.setState({ errorMessage: e.response.data.message });
      this.setState({ errorField: e.response.data.field });
    }
  };

  validateEmail = () => {
    if (this.state.errorMessage === "this email is already in use") {
      return "this email is already in use";
    }
    if (this.state.errorMessage === "invalid e-mail") {
      return "invalid e-mail";
    }
    return "E-mail";
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.props.user.id) {
      // eslint-disable-next-line react/prop-types
      this.props.history.push("/profile");
    }

    return (
      <>
        {this.state.errorMessage !== "Registration complete" && (
          <RegistrationForm onSubmit={this.registrationClick} className="card">
            <TextField
              error={this.state.errorField === "fullName"}
              label="Login"
              helperText={
                this.state.errorField === "fullName"
                  ? this.state.errorMessage
                  : ""
              }
              className="text-field"
              name="fullName"
              value={this.state.fullName}
              onChange={this.onInputChange}
            />

            <TextField
              error={this.state.errorField === "email"}
              label="Email"
              helperText={
                this.state.errorField === "email" ? this.state.errorMessage : ""
              }
              className="text-field"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onInputChange}
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
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />

            <TextField
              error={this.state.errorMessage === "Password mismatch"}
              label="Password confirmation"
              helperText={
                this.state.errorMessage === "Password mismatch"
                  ? this.state.errorMessage
                  : ""
              }
              className="text-field"
              name="passwordConfirm"
              type="password"
              value={this.state.passwordConfirm}
              onChange={this.onInputChange}
            />

            <Button
              className="reg-button"
              variant="contained"
              color="primary"
              type="submit"
              value="login"
            >
              Register
            </Button>

            <NavLink className="sing-in-link" to={"login"}>
              sing in
            </NavLink>
          </RegistrationForm>
        )}
      </>
    );
  }
}

const RegistrationForm = styled.form`
  .text-field {
    margin: 5px auto;
    max-width: 250px;
  }

  .reg-button {
    margin: 5px auto;
    width: 120px;
  }

  .sing-in-link {
    margin: 10px;
  }
`;

Registration.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
  }),
  {
    updateUser,
  }
);

export default connectFunction(Registration);
