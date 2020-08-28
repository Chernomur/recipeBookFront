import React, { createRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { editRecipe, editImgUpload, getRecipe } from "api/recipeApi";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { updateUser } from "store/main/actions";
import { Paper, TextField, Button } from "@material-ui/core";
import defaultImage from "public/defaultDish.png";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.inputFile = createRef();
    this.state = {
      title: "",
      description: "",
      difficulty: "",
      cookingTime: 110,
      image: null,
      file: null,
      authorId: null,

      errorMessage: null,
      errorField: null,
    };
  }

  componentDidMount() {
    this.getRecipeReq();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getRecipeReq();
    }
  }

  updateRecipeInfo = async (event) => {
    event.preventDefault();
    this.setState({ errorMessage: null, errorField: null });

    try {
      if (this.state.file) {
        await editImgUpload(this.props.match.params.id, this.state.file);
      }

      const response = await editRecipe(this.props.match.params.id, {
        title: this.state.title,
        description: this.state.description,
        difficulty: this.state.difficulty,
        cookingTime: this.state.cookingTime,
        file: this.state.file,
      });

      this.props.updateUser(response);

      // this.setState({ errorMessage: "change completed" });
      // eslint-disable-next-line react/prop-types
      this.props.history.push(`/recipe/${this.props.match.params.id}`);
    } catch (e) {
      console.log(e.message);
      // this.setState(
      //   { errorMessage: e.response.data.message },
      //   { errorField: e.response.data.field }
      // );
    }
  };

  updateRecipe = (recipe) => {
    this.setState({
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      image: recipe.image,
      authorId: recipe.authorId,
    });
    if (
      !(
        this.props.user.id === this.state.authorId ||
        this.props.user.role === "admin"
      )
    ) {
      this.props.history.push("/recipe-list/");
    }
  };

  getRecipeReq = async () => {
    try {
      const res = await getRecipe(this.props.match.params.id);
      this.updateRecipe(res);
    } catch (e) {
      // console.log(e);
    }
  };

  inputFileHandler = async (event) => {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeSlider = (event, value) => {
    this.setState({ cookingTime: value });
  };

  clickOnRef = () => {
    this.inputFile.current.click();
  };

  render() {
    if (
      !(
        this.props.user.id === this.state.authorId ||
        this.props.user.role === "admin"
      )
    ) {
      return null;
    }
    return (
      <>
        <EditRecipeForm onSubmit={this.updateRecipeInfo}>
          <Paper className="paper" elevation={3}>
            <div>
              <div>
                <Button
                  className="input-file"
                  variant="contained"
                  onClick={this.clickOnRef}
                >
                  Change dish image
                </Button>
              </div>
              <div className="preview">
                <img
                  className="img-preview"
                  src={
                    this.state.fileURL ||
                    (this.state.image ? this.state.image : defaultImage)
                  }
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

              <div className="user-info">
                <TextField
                  label="Change dish name"
                  fullWidth
                  className="dish-info"
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
                  label="Change description"
                  multiline
                  fullWidth
                  variant="outlined"
                  error={this.state.errorField === "description"}
                  helperText={
                    this.state.errorField === "description"
                      ? this.state.errorMessage
                      : ""
                  }
                  className="description"
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
              <InputLabel>Change cooking time</InputLabel>

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
                  <FormHelperText>Change difficulty level</FormHelperText>
                </FormControl>
              </div>

              <div className="buttons">
                <Link className="button-link" to="/profile">
                  <Button variant="contained">Back</Button>
                </Link>

                <Button type="submit" variant="contained" color="secondary">
                  Save changes
                </Button>
              </div>
            </div>
          </Paper>
        </EditRecipeForm>
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

const EditRecipeForm = styled.form`
  .paper {
    padding: 25px;
    margin: auto;
    max-width: 700px;
  }

  .dish-info {
    margin: 15px;
    max-width: 400px;
  }

  .input-file {
    margin: 10px;
  }

  .description {
    max-width: 600px;
  }

  .cooking-time {
    max-width: 320px;
    margin-top: 45px;
  }
  .img-preview {
    margin: auto;
    height: 150px;
  }

  .file-error {
    color: red;
  }

  .hidden {
    visibility: hidden;
  }

  .show-password-butt {
    margin-bottom: 15px;
  }
  .user-info div {
    margin: 15px;
  }

  .change-password {
    display: flex;
    margin: 15px;
    padding: 5px;
  }
  .change-password div {
    padding-right: 10px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    margin: 15px;
  }

  .button-link {
    text-decoration: none;
  }

  .avatar {
    width: 150px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
    editableContent: state.main.editableContent,
  }),
  {
    updateUser,
  }
);

EditRecipe.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

withRouter(EditRecipe);

export default connectFunction(EditRecipe);
