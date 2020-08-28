import React, { createRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { createRecipe } from "api/recipeApi";

import { Paper, TextField, Button } from "@material-ui/core";

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.inputFile = createRef();
    this.state = {
      title: "",
      description: "",
      difficulty: "",
      cookingTime: 110,
      file: null,

      errorMessage: null,
      errorField: null,
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeSlider = (event, value) => {
    this.setState({ cookingTime: value });
  };

  clickOnRef = () => {
    this.inputFile.current.click();
  };

  inputFileHandler = async (event) => {
    // this.setState({ fileURL: URL.createObjectURL(event.target.files[0]) });

    this.setState({ file: event.target.files[0] });
  };

  createRecipeReq = async (event) => {
    event.preventDefault();

    try {
      const response = await createRecipe({
        title: this.state.title,
        description: this.state.description,
        difficulty: this.state.difficulty,
        cookingTime: this.state.cookingTime,
        file: this.state.file,
      });

      this.props.history.push(`/recipe/${response.id}`);
    } catch (e) {
      this.setState({ errorMessage: e.response.data.message });
      this.setState({ errorField: e.response.data.field });
    }
  };

  render() {
    return (
      <>
        <CreateRecipeForm onSubmit={this.createRecipeReq}>
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
              {this.state.file && (
                <div className="preview">
                  <img
                    className="img-preview"
                    src={URL.createObjectURL(this.state.file)}
                  />
                </div>
              )}
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

              <div>
                <TextField
                  required
                  fullWidth
                  className="dish-info"
                  label="Enter the dish name"
                  error={this.state.errorField === "title"}
                  helperText={
                    this.state.errorField === "title"
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
                  fullWidth
                  className="description"
                  label="Detailed description"
                  multiline
                  variant="outlined"
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

              <Slider
                defaultValue={30}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                value={this.state.cookingTime}
                min={0}
                max={180}
                required
                label="Enter cooking time"
                className="cooking-time"
                name="cookingTime"
                onChangeCommitted={this.onInputChange}
                onChange={this.changeSlider}
                marks={marks}
              />
              <InputLabel>Cooking time</InputLabel>

              <div className={"difficulty"}>
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
              </div>

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

const marks = [
  {
    value: 0,
    label: "0 min",
  },
  {
    value: 180,
    label: "180 min",
  },
];

const CreateRecipeForm = styled.form`
  max-width: 1000px;

  .paper {
    padding: 15px;
  }
  .description {
    max-width: 800px;
  }
  .difficulty {
    margin-top: 25px;
  }
  .dish-info {
    margin: 15px;
    max-width: 400px;
  }

  .cooking-time {
    max-width: 320px;
    margin-top: 45px;
  }
  .hidden {
    visibility: hidden;
  }
  .img-preview {
    margin-top: 25px;
    border-radius: 14px;
    height: 250px;
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

const connectFunction = connect();
// (state) => ({
//   : state.main.user,
//   editableContent: state.main.editableContent,
// }),
// {
//   updateUser,
// }
CreateRecipe.propTypes = {
  history: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
  // updateUser: PropTypes.func.isRequired,
};

export default connectFunction(CreateRecipe);
