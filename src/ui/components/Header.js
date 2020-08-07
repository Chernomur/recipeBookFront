import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { singInUser } from "store/main/actions";
import { storage } from "utils";

class Header extends React.Component {
  logOut = () => {
    this.props.singInUser({});
    storage.token.set(null);
  }

  render() {
    return (
      <>
        <StiledHeader>
          <img
            className="header-logo"
            alt={"logo"}
            src={"https://image.flaticon.com/icons/svg/3202/3202822.svg"}
          />
          <input placeholder="search recipes" />
          <ul>
            <li>
              {
                this.props.user.id &&
                <NavLink to="/recipe-list">
                  Favorite
                </NavLink>
              }
            </li>
            <li>
              {
                this.props.user.id &&
                <NavLink to="/profile">
                  Profile
                </NavLink>
              }
            </li>
            <li>
              {
                this.props.user.id &&
                <button onClick={this.logOut}>
                  logOut
                </button>
              }
            </li>
            <li>
              {
                !this.props.user.id &&
                <NavLink to="/login">
                  login
                </NavLink>
              }
            </li>
            <li>
              {
                !this.props.user.id &&
                <NavLink to="/registration">
                  registration
                </NavLink>
              }
            </li>
          </ul>
        </StiledHeader>
      </>
    );
  }
}

const StiledHeader = styled.header`
  display: flex;
  align-items: center ;
  justify-content: space-between;
  background: burlywood;
  padding: 5px 25px 5px 25px ;
  margin-bottom: 25px;
  border-radius: 38px;
  
  .header-logo{
    width: 50px;
  }
  
  li{
    margin-left: 10px;
    display: inline;
  }
  
  input{
    width: 500px;
    height: 20px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user
  }), {
    singInUser
  }
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
  singInUser: PropTypes.func.isRequired
};

export default connectFunction(Header);
