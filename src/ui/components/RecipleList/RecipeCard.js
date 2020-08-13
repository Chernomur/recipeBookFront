import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RecipeCard = ({ title, overview, difficulty, cookingTime }) => {
  return (
    <StyledRecipeCard>
      <div className="card-info-container">
        <h4>{title}</h4>

        <div className="overview">
          <p>{overview}</p>
        </div>

        <div className="cooking-information">
          {difficulty}
          {cookingTime} мин.
        </div>
      </div>
    </StyledRecipeCard>
  );
};

const StyledRecipeCard = styled.div`
  border-radius: 38px;
  background-image: url(https://www.gastronom.ru/binfiles/images/20180515/b03545cb.jpg);
  background-size: cover;
  box-shadow: 5px 5px 10px #b1b0af, -5px -5px 10px #ebeae9;

  .card-info-container {
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    margin: 5px;
    height: 290px;
    width: 240px;
    border-radius: 38px;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.7)
    );
  }

  h4 {
    margin: 10px;
  }

  .overview {
    border-radius: 38px;
    margin-left: 10px;
    width: 220px;
    height: 150px;
  }
  .overview p {
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cooking-information {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.7)
    );
    height: 20px;
    border-radius: 38px;
  }
`;

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cookingTime: PropTypes.number.isRequired,
};

export default RecipeCard;
