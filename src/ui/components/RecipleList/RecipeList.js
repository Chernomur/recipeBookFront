import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetAllRecipes } from "store/recipe/actions";
import { allRecipe } from "api/recipeApi";
import { TaskType } from "utils/types";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";

class RecipeList extends React.Component {
  async componentDidMount() {
    await allRecipe().then((res) => {
      this.props.GetAllRecipes(res);
    });
  }

  render() {
    return (
      <StyledRecipeListContainer>
        {this.props.recipes.map(
          ({ id, title, description, difficulty, cookingTime }) => (
            <RecipeCard
              key={id}
              title={title}
              description={description}
              difficulty={difficulty}
              cookingTime={cookingTime}
            ></RecipeCard>
          )
        )}
      </StyledRecipeListContainer>
    );
  }
}

const StyledRecipeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    flex: 1 2 250px;
    max-width: 250px;
    height: 300px;
    margin: 15px;
    text-align: center;
  }
`;

const connectFunction = connect(
  (state) => ({
    recipes: state.recipe.recipes,
  }),
  {
    GetAllRecipes,
  }
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(TaskType).isRequired,
  GetAllRecipes: PropTypes.func.isRequired,
};

export default connectFunction(RecipeList);
