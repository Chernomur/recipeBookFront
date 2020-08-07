import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  return (
    <div>
      {
        !props.user.id &&
        <div>
          <h2>вы не зарегистрированы</h2>
        </div>
      }
      {
        props.user.id &&
        <StyledProfilePage>
          <img
            className="avatar"
            src="https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+people+person+profile+user+users+icon-1320190727966457290.png"
            alt="user's avatar"
          />

          <div>
            <div>
              {props.user.fullName}
            </div>

            <div>
              {props.user.email}
            </div>

          </div>
          <NavLink to={"edit-profile"}>
            EditProfile
          </NavLink>
        </StyledProfilePage>
      }
    </div>
  );
};

const StyledProfilePage = styled.div`
  display: flex;
  background: indianred;
  padding: 15px;
  
  .avatar{
    width: 150px;
  }
  
  ul{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  li{
    text-align: left;
    margin: 15px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user
  }), { }
);

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default connectFunction(Profile);
