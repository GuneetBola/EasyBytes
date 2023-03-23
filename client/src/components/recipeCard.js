import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScrollBar from "react-custom-scrollbars";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { useState } from "react";

function getFormattedDate(date) {
  return date.substring(0, 19).replace("T", " ");
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// primary for colour for like icon
const RecipeReviewCard = ({ post, onClick }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleButtonClick = () => {
    onClick();
  };

  const [likes, setLikes] = useState(0);

  const getLikeCount = () => {
    Axios.get(`http://localhost:5000/likes?recipeID=${post.recipe_id}`).then(
      (response) => {
        const data = response.data[0].like_count;
        setLikes(data);
      }
    );
  };

  const getLikeButtonColour = () => {
    Axios.get(
      `http://localhost:5000/usersLiked?recipeID=${post.recipe_id}`
    ).then((response) => {
      if (
        response.data.includes(Number(sessionStorage.getItem("authenticated")))
      ) {
        setlikedButtonColour("primary");
        setLiked(true);
      } else {
        setlikedButtonColour("");
        setLiked(false);
      }
    });
  };

  const [liked, setLiked] = useState(false);
  const [likedButtonColour, setlikedButtonColour] = useState("");

  function updateLikes() {
    if (!liked) {
      Axios.post("http://localhost:5000/likes", {
        userID: sessionStorage.getItem("authenticated"),
        recipeID: post.recipe_id,
      });
      getLikeButtonColour();
    } else {
      Axios.delete(
        `http://localhost:5000/likes?recipeID=${
          post.recipe_id
        }&userID=${sessionStorage.getItem("authenticated")}`
      );
      getLikeButtonColour();
    }
  }

  getLikeCount();
  getLikeButtonColour();

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Button onClick={handleButtonClick}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.first_name !== null
                ? post.first_name[0] + post.last_name[0]
                : "EB"}
            </Avatar>
          </Button>
        }
        action={
          <IconButton aria-label="favourite">
            <Tooltip title="Favourite recipe">
              <BookmarkIcon />
            </Tooltip>
          </IconButton>
        }
        title={post.dish_name}
        titleTypographyProps={{ variant: "subtitle2" }}
        subheader={getFormattedDate(post.date_modified)}
      />
      <CardMedia
        component="img"
        height="300"
        width="300"
        image={post.recipe_picture}
        justifyContent="center"
      />
      <CardContent>
        <ScrollBar style={{ height: 300 }}>
          <Typography variant="body2" color="black">
            <strong>Cuisine:</strong> {post.cuisine}
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Diet Labels:</strong>{" "}
            {post.health_label.replaceAll("|", ", ")}
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Meal Types:</strong> {post.meal_type.replaceAll("|", ", ")}
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Cook Time:</strong> {post.cook_time} mins
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Calories:</strong> {post.calories}
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Servings:</strong> {post.servings}
          </Typography>
          <Typography variant="body2" color="black">
            <strong>Ingredients:</strong>{" "}
            {post.ingredients.replaceAll("|", ", ")}
          </Typography>
        </ScrollBar>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="subheading1" color="black" margin={1}>
          <strong>{likes}</strong>
        </Typography>
        <IconButton aria-label="like post" onClick={updateLikes}>
          <Tooltip title="Like recipe">
            <ThumbUpIcon color={likedButtonColour} />
          </Tooltip>
        </IconButton>
        <IconButton aria-label="comment on post">
          <Tooltip title="Comment on post">
            <CommentIcon />
          </Tooltip>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="View recipe instructions">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:</Typography>
          {post.instructions.split("|").map((instruction) => (
            <Typography paragraph>{instruction}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeReviewCard;
