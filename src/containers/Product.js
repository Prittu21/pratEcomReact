import { Button, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../common/Carousel";

const classes = {
    product: {
        marginTop: "1em",
        textAlign: "left"
    },
    ml1: {
        marginLeft: "1em"
    }
}

function Product(props) {
    const { id } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const { title = "", rating = 0.0, description = "", price = 0, stock = 0, images = [] } = productInfo;
    useEffect(() => {// handler to fetch product info based on productId
        if (id) {
            const token = localStorage.getItem("token");
            fetch(`https://dummyjson.com/auth/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then((data) => {
                    setProductInfo(data);
                });
        }
    }, [id]);

    const modImages= images.map((img) => {
        return {
            label: "",
            imgPath: img
        }
    })

    return (
        <Grid container xs={12} spacing={2} style={classes.product}>
            <Grid item sm={12} md={7}>
              <Carousel images={modImages} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={classes.ml1}>
                <Typography component="h3" variant="h6">
                    <b>Name:</b> {title}
                </Typography>

                <Typography component="h3" variant="h6">
                    <b>Description:</b> {description}
                </Typography>
                <Typography component="h3" variant="h6">
                    <b>Price:</b> ₹{price}
                </Typography>
                <Typography component="h3" variant="h6">
                    <b>Rating:</b>
                    <Rating name="half-rating-read" value={rating} precision={0.1} readOnly sx={{verticalAlign: "text-bottom"}} />
                </Typography>
                <div>
                    <Button variant="contained">Add To Cart</Button>
                </div>
            </Grid>
        </Grid>
    )
};

export default Product;