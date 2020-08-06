import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  return (
    <div>
      {
        !props.authorisedUser.id &&
        <div>
          <h2>вы не зарегистрированы</h2>
        </div>
      }
      {
        props.authorisedUser.id &&
        <StyledProfilePage>
          <img
            className="avatar"
            src="https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+people+person+profile+user+users+icon-1320190727966457290.png"
            alt="user's avatar"
          />

          <div>
            <div>
              {props.authorisedUser.fullName}
            </div>

            <div>
              {props.authorisedUser.email}
            </div>

          </div>
          <NavLink to={"EditProfile"}>
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
    authorisedUser: state.main.authorisedUser
  }), { }
);

Profile.propTypes = {
  authorisedUser: PropTypes.object.isRequired
};

export default connectFunction(Profile);
