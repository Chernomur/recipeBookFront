import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CardContent from "@material-ui/core/CardContent";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import defaultImg from "public/defaultDish.png";

import CardMedia from "@material-ui/core/CardMedia";
import { delFavorite, toFavorites } from "api/userApi";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/Star";

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFavorite: false
    };
  }

  componentDidMount() {
    if (this.props.users) {
      this.setState({ isInFavorite: Boolean(this.props.users.find(this.findFavoritesUser)) });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
     this.setState({ isInFavorite: Boolean(this.props.users.find(this.findFavoritesUser)) });
    }
  }

  findFavoritesUser = (item, index, array) => {
    return item.id === this.props.user.id;
  };

  addToFavorites = async () => {
    await toFavorites({ id: this.props.id });
    this.setState({ isInFavorite: true });
  };

  delFromFavorite = async () => {
    await delFavorite(this.props.id);
    this.setState({ isInFavorite: false });
  };

  render() {
    return (
      <StyledRecipeCard>
        <Card elevation={5} className="root">
          <CardMedia
            component="img"
            onClick={this.props.onClick}
            image={this.props.image || defaultImg}
            className="media"
          />

          <CardContent className="description">
            <Typography noWrap variant="h5">
              {this.props.title}
            </Typography>
            <Typography className="text">{this.props.description}</Typography>
          </CardContent>

          <CardActions disableSpacing className="actions">
            {this.state.isInFavorite ?
              <IconButton onClick={this.delFromFavorite} aria-label="add to favorites">
                <StarIcon size="large" />
              </IconButton>
              :
              <IconButton onClick={this.addToFavorites} aria-label="add to favorites">
                <StarBorderIcon size="large" />
              </IconButton>
            }

            <Typography>{this.props.difficulty} </Typography>
            <Typography>{this.props.cookingTime} min.</Typography>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </StyledRecipeCard>
    );
  }
}

const StyledRecipeCard = styled.div`
  .root {
    margin: 15px;
    max-height: 350px;
    min-height: 350px;
    min-width: 300px;
    max-width: 300px;
  }
  .media {
    height: 180px;

  }

  .description {
    height: 80px;
  }

  .text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }
`;

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  cookingTime: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user
  })
);

export default connectFunction(RecipeCard);
