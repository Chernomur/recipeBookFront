import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRecipe } from "api/recipeApi";
import { Typography, Paper, Button } from "@material-ui/core";
import PropTypes from "prop-types";

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
      <>
        <Paper className="paper" elevation={3}>
          <div>{this.state.recipe.dishImg}</div>
          <div className="dish-info">
            <Typography>{this.state.recipe.title}</Typography>
          </div>
          <div>
            <Typography>{this.state.recipe.description}</Typography>
          </div>
          <Typography>{this.state.recipe.difficulty}</Typography>

          <div className="buttons">
            <Link className="button-link" to="/recipe-list">
              <Button variant="contained">Back</Button>
            </Link>
          </div>
        </Paper>
      </>
    );
  }
}

const connectFunction = connect();
// (state) => ({
//   : state.main.user,
//   editableContent: state.main.editableContent,
// }),
// {
//   updateUser,
// }

Recipe.propTypes = {
  // user: PropTypes.object.isRequired,
  // updateUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

withRouter(Recipe);

export default connectFunction(Recipe);
