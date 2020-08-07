import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import axios from "api/axios";
import { storage } from "utils";
import { singInUser } from "store/main/actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      serverMessage: null
    };
  }

  registrationClick = async (event) => {
    event.preventDefault();
    if (this.state.passwordConfirm !== this.state.password) {
      this.setState({ serverMessage: "Password mismatch" });
      return;
    }
    try {
      const response = await axios.post(`${axios.defaults.baseURL}/auth/singUp`,
        {
          fullName: this.state.fullName,
          email: this.state.email,
          password: this.state.password
        });

      this.setState({ serverMessage: "Registration complete" });
      storage.token.set(response.token);
      this.props.singInUser(response.user);
    } catch (e) {
      this.setState({ serverMessage: e.response.data });
    }
  }

  validateEmail = () => {
    if (this.state.serverMessage === "this email is already in use") {
      return "this email is already in use";
    }
    if (this.state.serverMessage === "invalid e-mail") {
      return "invalid e-mail";
    }
    return "E-mail";
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
        {(this.state.serverMessage !== "Registration complete") &&
        <RegistrationForm
          onSubmit={this.registrationClick}
          className="card">

          <TextField
            error={this.state.serverMessage === "invalid fullName"}
            label={(this.state.serverMessage === "invalid fullName" && "invalid login") || "Login"}
            className="text-field"
            name="fullName"
            value={this.state.fullName}
            onChange={this.onInputChange}
          />

          <TextField
            error={this.state.serverMessage === "invalid e-mail" || this.state.serverMessage === "this email is already in use"}
            label={this.validateEmail()}
            className="text-field"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onInputChange} />

          <TextField
            error={this.state.serverMessage === "invalid password"}
            label={(this.state.serverMessage === "invalid password" && "invalid password") || "Password"}
            className="text-field"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange} />

          <TextField
            error={this.state.serverMessage === "Password mismatch"}
            label={(this.state.serverMessage === "Password mismatch" && "Password mismatch") || "Password confirmation"}
            className="text-field"
            name="passwordConfirm"
            type="password"
            value={this.state.passwordConfirm}
            onChange={this.onInputChange} />

          <Button
            className="reg-button"
            variant="contained"
            color="primary"
            type="submit"
            value="login"
          > Registration</Button>

        </RegistrationForm>}
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
`;

Registration.propTypes = {
  singInUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user
  }), {
    singInUser
  }
);

export default connectFunction(Registration);
