import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import RecipleCard from "./RecipleCard";

const RecipeList = (props) => {
  return (
    <StyledRecipeListContainer>
      {/* add propType */}
      {/* eslint-disable-next-line react/prop-types */}
      {props.recipes.map(({ title, overview, difficulty, cookingTime }) => (

        // eslint-disable-next-line react/jsx-key
        <RecipleCard
          title={title}
          overview={overview}
          difficulty={difficulty}
          cookingTime={cookingTime}
        >

        </RecipleCard>
      ))}

    </StyledRecipeListContainer>
  );
};

const StyledRecipeListContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  
  div{
    flex: 1 2 250px;
    max-width: 250px;
    height: 300px;
    margin: 10px;
    text-align: center;
  }
`;

const connectFunction = connect(
  (state) => ({
    recipes: state.recipe.recipes
  })
);

export default connectFunction(RecipeList);