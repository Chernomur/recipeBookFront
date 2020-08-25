import React, { createRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import { Paper, TextField, Button, Avatar } from "@material-ui/core";

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.inputFile = createRef();
    this.state = {
      title: "",
      description: "",
      difficulty: "",
      cookingTime: null,
      // dishImg: null,
    };
  }

  onInputChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.getReqRecipes
    );
  };

  clickOnRef = () => {
    this.inputFile.current.click();
  };

  render() {
    return (
      <>
        <CreateRecipeForm onSubmit={this.updateUserInfo}>
          <Paper className="paper" elevation={3}>
            <div>
              <div>
                <Button
                  className="input-file"
                  variant="contained"
                  onClick={this.clickOnRef}
                >
                  Add dish photos
                </Button>
              </div>
              <div className="preview">
                <Avatar
                  className="img-preview"
                  // src={this.state.dishImg || this.props.user.avatar}
                />
              </div>
              <div className="file-error">
                <h3>
                  {this.state.errorField === "inputFile" &&
                    this.state.errorMessage}
                </h3>
              </div>
              <input
                accept="image/*"
                className="hidden"
                onChange={this.inputFileHandler}
                ref={this.inputFile}
                type="file"
              />

              <div className="dish-info">
                <TextField
                  required
                  label="Enter the dish name"
                  error={this.state.errorField === "title"}
                  helperText={
                    this.state.errorField === "Dish name"
                      ? this.state.errorMessage
                      : ""
                  }
                  value={this.state.title}
                  onChange={this.onInputChange}
                  name="title"
                />
              </div>
              <div>
                <TextField
                  required
                  label="Enter short description"
                  error={this.state.errorField === "description"}
                  helperText={
                    this.state.errorField === "description"
                      ? this.state.errorMessage
                      : ""
                  }
                  value={this.state.description}
                  name="description"
                  onChange={this.onInputChange}
                />
              </div>
              <FormControl required className="form-control">
                <InputLabel id="demo-simple-select-helper-label">
                  Difficulty
                </InputLabel>
                <Select
                  name="difficulty"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.difficulty}
                  onChange={this.onInputChange}
                >
                  <MenuItem value={"Ease"}>Ease</MenuItem>
                  <MenuItem value={"Middle"}>Middle</MenuItem>
                  <MenuItem value={"Hard"}>Hard</MenuItem>
                </Select>
                <FormHelperText>Select difficulty level</FormHelperText>
              </FormControl>
              <TextField
                required
                label="Enter cooking time"
                error={this.state.errorField === "cookingTime"}
                helperText={
                  this.state.errorField === "cookingTime"
                    ? this.state.errorMessage
                    : ""
                }
                value={this.state.cookingTime}
                name="cookingTime"
                onChange={this.onInputChange}
              />

              <div className="buttons">
                <Link className="button-link" to="/recipe-list">
                  <Button variant="contained">Back</Button>
                </Link>

                <Button type="submit" variant="contained" color="secondary">
                  Create recipe
                </Button>
              </div>
            </div>
          </Paper>
        </CreateRecipeForm>
      </>
    );
  }
}

const CreateRecipeForm = styled.form`
  .hidden {
    visibility: hidden;
  }
`;

const connectFunction = connect(() => null, {
  // updateRecipe,
});

CreateRecipe.propTypes = {
  // updateRecipe: PropTypes.func.isRequired,
};

export default connectFunction(CreateRecipe);
