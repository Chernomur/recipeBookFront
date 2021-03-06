import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetAllRecipes } from "store/recipe/actions";
import axios from "api/axios";
import { TaskType } from "utils/types";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";

class RecipeList extends React.Component {
  componentDidMount() {
    try {
      axios.get(`${axios.defaults.baseURL}/recipe/`)
        .then((res) => {
          this.props.GetAllRecipes(res);
        });
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    return (
      <StyledRecipeListContainer>

        {this.props.recipes.map(({ _id, title, overview, difficulty, cookingTime }) => (
          <RecipeCard
            key={_id}
            title={title}
            overview={overview}
            difficulty={difficulty}
            cookingTime={cookingTime}
          >
          </RecipeCard>
        ))}
      </StyledRecipeListContainer>
    );
  }
}

const StyledRecipeListContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  
  div{
    flex: 1 2 250px;
    max-width: 250px;
    height: 300px;
    margin: 15px;
    text-align: center;
  }
`;

const connectFunction = connect(
  (state) => ({
    recipes: state.recipe.recipes
  }), {
    GetAllRecipes
  }
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(TaskType).isRequired,
  GetAllRecipes: PropTypes.func.isRequired
};

export default connectFunction(RecipeList);
