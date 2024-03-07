import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, makeStyles } from "@mui/material";
import React from "react";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from "@mui/material/colors";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

const classes = {
  root: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  ellipsis: {
    whiteSpace: "nowrap", /* Prevents wrapping */
    overflow: "hidden", /* Hides overflowing content */
    textOverflow: "ellipsis", /* Adds ellipsis for overflowed text */
    width: "100%" /* Define a width to the container */
  }
}

export default function ProductCard(props) {
  const {id, title = "", brand = "", thumbnail= "", description = "", price=""} = props?.item || {};
  const navigate = useNavigate();
  return (
    <Card style={classes.root}>
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/product/${id}`);
      }}
      title="Click me to know more">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`${brand} Price: ₹${price}`}
      />
      <CardMedia
        style={classes.media}
        image={thumbnail}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" title={description} style={classes.ellipsis}>
          {description}
        </Typography>
      </CardContent>
      </div>
      <CardActions disableSpacing style={{justifyContent: "space-between"}}>
        <div>
        <IconButton aria-label="add to favorites" title="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" title="Share link">
          <ShareIcon />
        </IconButton>
        </div>
        <IconButton aria-label="share" title="Add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
