import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRecipe } from "api/recipeApi";
import { Typography, Paper, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaultImg from "public/defaultDish.png";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getRecipeReq();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     this.getRecipeReq();
  //   }
  // }

  updateRecipe = (recipe) => {
    this.setState({ recipe });
  };

  getRecipeReq = async () => {
    try {
      const res = await getRecipe(this.props.match.params.id);
      this.updateRecipe(res);
    } catch (e) {
      // console.log(e);
    }
  };

  render() {
    if (!this.state.recipe) {
      return null;
    }

    return (
      <StyledRecipePage>
        <Paper className="paper" elevation={5}>
          <Typography variant="h1">{this.state.recipe.title}</Typography>

          <StyledRecipeInfo>
            <img
              className={"recipe-image"}
              src={
                this.state.recipe.image ? this.state.recipe.image : defaultImg
              }
            />

            <div>
              <Typography>{this.state.recipe.description}</Typography>
            </div>
            <div className="dish-info">
              <Typography variant="h5">
                Difficulty: {this.state.recipe.difficulty}
              </Typography>
              <Typography variant="h5">
                {" "}
                Cooking time: ~{this.state.recipe.cookingTime} min.
              </Typography>
            </div>
          </StyledRecipeInfo>
          <div className="buttons">
            <Link className="button-link" to="/recipe-list">
              <Button variant="contained">Back</Button>
            </Link>
            {this.state.recipe.authorId === this.props.user.id ||
            this.props.user.role === "admin" ? (
              <Link
                className="button-link"
                to={`/edit-recipe/${this.state.recipe.id}`}
              >
                <Button variant="contained" color="secondary">
                  Edit recipe
                </Button>
              </Link>
            ) : null}
          </div>
        </Paper>
      </StyledRecipePage>
    );
  }
}

const StyledRecipePage = styled.div`
  .paper {
    padding: 15px;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    margin: 15px;
  }

  .button-link {
    text-decoration: none;
  }
`;

const StyledRecipeInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 30px;
  padding: 15px;

  .recipe-image {
    margin: auto;
    border-radius: 14px;
    height: 300px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
    editableContent: state.main.editableContent,
  }),
  null
);
Recipe.propTypes = {
  user: PropTypes.object.isRequired,
  // updateUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

withRouter(Recipe);

export default connectFunction(Recipe);
