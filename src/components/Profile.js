import React from "react";
import styled from "styled-components";

const Profile = () => {
  return (
    <StyledProfilePage>
      <img
        className="avatar"
        src="https://sun9-74.userapi.com/impf/c851120/v851120236/74d76/S7RKNX4icvQ.jpg?size=200x0&quality=90&sign=506e2d40a28e6ad1f35dc8a0481a7743&ava=1"
        alt="user's avatar"
      />
      <div>
        <ul>
          <li>
            Fullname : Chernom-kun
          </li>
          <li>
            Email : chernomur777@gmail.com
          </li>
        </ul>

      </div>
    </StyledProfilePage>
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
    margin: 15px;
  }
`;

export default Profile;
