import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetAllRecipes } from "ui/pages/Recipes/store/actions";
import { TaskType } from "utils/types";
import PropTypes from "prop-types";
import RecipeCard from "./components/RecipeCard";
import Filters from "./components/Filters";

class RecipeList extends React.Component {
  clickOnRecipe = (id) => {
    this.props.history.push(`/recipe/${id}`);
  };

  render() {
    return (
      <>
        <Filters />
        <StyledRecipeListContainer>
          {this.props.recipes.map(
            ({ id, title, description, difficulty, cookingTime, image, Users }) => (
              <RecipeCard
                onClick={() => this.clickOnRecipe(id)}
                key={id}
                id={id}
                title={title}
                description={description}
                difficulty={difficulty}
                cookingTime={cookingTime}
                image={image}
                users={Users}
              ></RecipeCard>
            )
          )}
        </StyledRecipeListContainer>
      </>
    );
  }
}

const StyledRecipeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  flex: 1 2 250px;
`;

const connectFunction = connect(
  (state) => ({
    recipes: state.recipe.recipes
  }),
  {
    GetAllRecipes
  }
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(TaskType).isRequired,
  history: PropTypes.object.isRequired
};

export default connectFunction(RecipeList);
