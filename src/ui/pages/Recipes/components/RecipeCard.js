import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Avatar from "@material-ui/core/Avatar";
// import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";

const RecipeCard = ({
  onClick,
  title,
  description,
  difficulty,
  cookingTime,
  // image,
}) => {
  return (
    <StyledRecipeCard>
      <Card className="root">
        <Typography>{title}</Typography>
        <CardMedia
          onClick={onClick}
          image={
            "https://i.pinimg.com/originals/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.png"
          }
          className="media"
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <div className="description">
          {difficulty} / {cookingTime} мин.
        </div>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Card>
    </StyledRecipeCard>
  );
};

const StyledRecipeCard = styled.div`
  .root {
    max-height: 350px;
    min-height: 350px;
    min-width: 300px;
    max-width: 300px;
  }
  .media {
    height: 150px;
  }
  .description {
    max-width: 320px;
  }
`;

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cookingTime: PropTypes.number.isRequired,
  // image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
