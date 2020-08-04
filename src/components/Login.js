import React from "react";
import styled from "styled-components";
import axios from "api/axios";
import { NavLink } from "react-router-dom";

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

      // console.log("👉 Returned data:", response);
      if (!response.token) {
        this.setState({ serverMessage: response.data });
      } else {
        this.setState({ serverMessage: "Login complete" });
        localStorage.setItem("token", response.token);
      }
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
        {((this.state.serverMessage !== "Login complete") && (
          <LoginContainer className="card">

            Login:
            <input onChange={this.changeEmail} type="text"/>

            Password:
            <input onChange={this.changePassword} type="password"/>

            <button onClick={this.singInClick}>singIn</button>
            <NavLink to={"registration"}>Registration</NavLink>
          </LoginContainer>
        ))}
        {this.state.serverMessage && <div className="card">
          {this.state.serverMessage}
        </div>}
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

export default Login;
