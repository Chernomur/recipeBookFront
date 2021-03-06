import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    text-align: center;
    background-color: blanchedalmond;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .card {
    margin:   auto;
    text-align: center;
    width: 350px;
    display: flex;
    flex-direction: column;
    border-radius: 38px;
    background-size: cover;
    box-shadow:  5px 5px 10px #b1b0af, 
               -5px -5px 10px #ebeae9;
  }
`;
