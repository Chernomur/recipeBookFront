import React from "react";
import styled from "styled-components";

// Добавить проп тайпс
// eslint-disable-next-line react/prop-types
const RecipleCard = ({ title, overview, difficulty, cookingTime }) => {
  return (
    <StyledRecipleCard>
      <div>
        <h3>{title}</h3>
        <h4>{overview}</h4>
        <h4>{difficulty}</h4>
        <h4>{cookingTime}</h4>
      </div>
    </StyledRecipleCard>
  );
};

const StyledRecipleCard = styled.div`
  border-radius: 38px;
  background-image: url(https://www.gastronom.ru/binfiles/images/20180515/b03545cb.jpg);
  background-size: cover;
  box-shadow:  5px 5px 10px #b1b0af, 
             -5px -5px 10px #ebeae9;
             
  div{
  border-radius: 10px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, .7));
  }
`;

export default RecipleCard;
