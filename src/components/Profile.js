import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Profile = (props) => {
  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      {props.authorisedUser.id === null &&
      <div>
        <h2>вы не зарегистрированы</h2>
      </div>
      }
      {/* eslint-disable-next-line react/prop-types */}
      {props.authorisedUser.id !== null &&
      <StyledProfilePage>
        <img
          className="avatar"
          src="https://sun9-74.userapi.com/impf/c851120/v851120236/74d76/S7RKNX4icvQ.jpg?size=200x0&quality=90&sign=506e2d40a28e6ad1f35dc8a0481a7743&ava=1"
          alt="user's avatar"
        />
        <div>
          <ul>
            <li>
              {/* eslint-disable-next-line react/prop-types */}
              {props.authorisedUser.fullName}
            </li>
            <li>
              {/* eslint-disable-next-line react/prop-types */}
              {props.authorisedUser.email}
            </li>
            <li>
              {/* eslint-disable-next-line react/prop-types */}
              {props.authorisedUser.role}
            </li>
          </ul>

        </div>
      </StyledProfilePage>}
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
  })
);

export default connectFunction(Profile);
