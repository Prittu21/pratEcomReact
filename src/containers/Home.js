import { AppBar, Backdrop, CircularProgress, Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import SearchBar from '../components/SearchBar';

const classes = {
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    pagination: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "2em 0",
    }
  }

const Home = (props) => {
    const [products, setProducts] = useState({});
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = useState(1);
    

    useEffect(() => {//handler for pagination change
        const token = localStorage.getItem("token");
        handleOpen(); // starting loader
        fetch(`https://dummyjson.com/auth/products?limit=10&skip=${10 * (page - 1)}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then((data) => {
                setProducts(data);
                //closing loader
                handleClose();
            }).catch((err) => {
                //closing loader
                handleClose();
            })
    }, [page]);


    //Loader handlers
    const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };


    //All pagination handlers
    const handleChange = (event, value) => {
        setPage(value);
    };
    const totalPages =  products?.total ? Math.ceil(products.total/products.limit)  : 1;

    return (<>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={3}>
           
             {/* Search and sortBar */}
             <SearchBar
               products={products}
               setProducts={setProducts}
               handleOpen={handleOpen}
               handleClose={handleClose}
               page={page}
            />
            {/* Content Section */}
            <Grid item container xs={12}>
                <Grid item xs={false} sm={1}></Grid>

                <Grid container xs={12} sm={10} spacing={2}>
                    {(products?.products || []).map((item) => { // showing list of products 
                        return <Grid key={item.id} className={classes.cardPadding} item xs={12} sm={6} md={3}>
                            <ProductCard item={item} />
                        </Grid>
                    })}
                </Grid>

                <Grid item xs={false} sm={1}></Grid>
                <Pagination count={totalPages} color="primary" style={classes.pagination} page={page} onChange={handleChange} />
            </Grid>
        </Grid>
    </>
    );
  };

export default Home;