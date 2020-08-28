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

const RecipeCard = ({
  onClick,
  title,
  description,
  difficulty,
  cookingTime,
  image,
}) => {
  return (
    <StyledRecipeCard>
      <Card elevation={5} className="root">
        <CardMedia
          onClick={onClick}
          image={image || defaultImg}
          className="media"
        />

        <CardContent className="description">
          <Typography noWrap variant="h5">
            {title}
          </Typography>
          <Typography className="text">{description}</Typography>
        </CardContent>

        <CardActions disableSpacing className="actions">
          <IconButton aria-label="add to favorites">
            <StarBorderIcon size="large" />
          </IconButton>
          <Typography>{difficulty} </Typography>
          <Typography>{cookingTime} min.</Typography>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </StyledRecipeCard>
  );
};

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
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
