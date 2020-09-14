import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ShareIcon from "@material-ui/icons/Share";
import defaultImg from "public/defaultDish.png";
import { delFavorite, toFavorites } from "api/userApi";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import CardMedia from "@material-ui/core/CardMedia";

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFavorite: true
    };
  }

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
  cookingTime: PropTypes.number.isRequired,
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

RecipeCard.defaultProps = {
  image: null
};

export default RecipeCard;
