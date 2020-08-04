import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <StiledHeader>

      <img className="header-logo" alt={"logo"} src={"https://image.flaticon.com/icons/svg/3202/3202822.svg"}/>
      <input placeholder="search recipes" type="text"/>
      <ul>
        <li>
          <NavLink to="/RecipeList">Favorite</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/login">login</NavLink>
        </li>
        <li>
          <NavLink to="/registration">registration</NavLink>
        </li>

      </ul>

    </StiledHeader>
  );
};

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

export default Header;
