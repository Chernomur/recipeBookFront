import React from "react";
import styled from "styled-components";
import * as axios from "axios";
import interceptors from "../utils/interceptors";

interceptors();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      res: null
    };
  }

  singInClick = async () => {
    try {
      const response = await axios.post("http://192.168.0.108:3000/auth/singIn",
        {
          email: this.state.email,
          password: this.state.password
        });

      // console.log("👉 Returned data:", response);
      if (!response.data.token) {
        this.setState({ res: response.data });
      } else {
        this.setState({ res: "Login complete" });
      }
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
      this.setState({ res: e.response.statusText });
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
        {((this.state.res !== "Login complete") && (
          <LoginContainer className="card">

            Login:
            <input onChange={this.changeEmail} type="text"/>

            Password:
            <input onChange={this.changePassword} type="password"/>

            <button onClick={this.singInClick}>singIn</button>
            <button>Registration</button>
          </LoginContainer>
        ))}
        {this.state.res && <div className="card">
          {this.state.res}
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
