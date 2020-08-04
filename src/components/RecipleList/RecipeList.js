import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetAllRecipes } from "store/recipe/actions";
import RecipleCard from "./RecipleCard";
import axios from "../../api/axios";

class RecipeList extends React.Component {
  componentDidMount() {
    try {
      axios.get(`${axios.defaults.baseURL}/recipe/`)
        .then((res) => {
          // eslint-disable-next-line react/prop-types
          this.props.GetAllRecipes(res);
        });
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    return (
      <StyledRecipeListContainer>
        {/* add propType */}
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.recipes.map(({ title, overview, difficulty, cookingTime }) => (

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

export default connectFunction(RecipeList);
