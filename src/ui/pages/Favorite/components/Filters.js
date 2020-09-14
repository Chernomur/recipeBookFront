import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetAllRecipes } from "ui/pages/Recipes/store/actions";

import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";

import { favoriteRecipes } from "api/recipeApi";

class Filters extends React.Component {
  state = {
    sortValue: "",
    search: "",
    slider: [10, 120],
    difficulty: ""
  };

  async componentDidMount() {
    await this.getReqRecipes();
  }

  async getReqRecipes() {
    try {
      const res = await favoriteRecipes({
        timeFrom: this.state.slider[0],
        timeTo: this.state.slider[1],
        difficulty: this.state.difficulty,
        sorting: this.state.sortValue,
        search: this.state.search
      });

      if (res) {
        this.props.GetAllRecipes(res.Recipes);
      } else {
        this.props.GetAllRecipes([]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  sliderValueText = () => {
    return this.state.slider;
  };

  changeSlider = (event, value) => {
    this.setState({ slider: value });
  };

  onInputChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.getReqRecipes
    );
  };

  render() {
    return (
      <Card>
        <StyledFilter>
          <div>
            <InputLabel>Cooking time</InputLabel>

            <Slider
              max={180}
              value={this.state.slider}
              name="slider"
              className="slider"
              onChangeCommitted={this.onInputChange}
              onChange={this.changeSlider}
              step={5}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={this.sliderValueText}
            />
            <FormHelperText>Select cooking time</FormHelperText>
          </div>
          <TextField
            className="search"
            name="search"
            id="filled-textarea"
            placeholder="Search"
            size="small"
            onChange={this.onInputChange}
            value={this.state.search}
          />

          <FormControl className="form-control">
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
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              <MenuItem value={"Ease"}>Ease</MenuItem>
              <MenuItem value={"Middle"}>Middle</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
            <FormHelperText>Select difficulty level</FormHelperText>
          </FormControl>

          <FormControl className="form-control">
            <InputLabel>Sorting</InputLabel>
            <Select
              labelId="select-helper-label"
              id="select-helper"
              value={this.state.sortValue}
              name="sortValue"
              onChange={this.onInputChange}
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>

              <MenuItem value={"▲Time cooking"}>▲Time cooking</MenuItem>

              <MenuItem value={"▼Time cooking"}>▼Time cooking</MenuItem>

              <MenuItem value={"▲Cooking difficulty"}>
                ▲Cooking difficulty
              </MenuItem>

              <MenuItem value={"▼Cooking difficulty"}>
                ▼Cooking difficulty
              </MenuItem>

              <MenuItem value={"▲Alphabetical"}>A-Z</MenuItem>

              <MenuItem value={"▼Alphabetical"}>Z-A</MenuItem>
            </Select>
            <FormHelperText>Select difficulty level</FormHelperText>
          </FormControl>
        </StyledFilter>
      </Card>
    );
  }
}

const StyledFilter = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 10px;
  max-width: 1200px;
  margin: 25px;

  .search {
    padding-top: 19px;
  }
  .slider {
    padding-top: 30px;
  }
`;
const connectFunction = connect(
  (state) => ({
    recipes: state.recipe.recipes
  }),
  {
    GetAllRecipes
  }
);

Filters.propTypes = {
  GetAllRecipes: PropTypes.func.isRequired
};

export default connectFunction(Filters);
