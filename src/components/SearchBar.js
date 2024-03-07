import { Checkbox, FormControl, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const classes = {
    textField: {
        marginLeft: "2em",
        paddingRight: "1em",
        width: "90%"
    },
    ml15: {
        marginLeft: "1.5em"
    }
}

const names = [
    'Title',
    'Price Low to High',
    'Price High to Low',
  ];

function SearchBar(props){
    const {products, setProducts, handleOpen, handleClose, page} = props;
    const [searchVal, setSearchVal] = useState("");
    const [sortVal, setSortVal] = useState('');

    const handleChange = (event) => {//handler for sorting
        const {
            target: { value },
        } = event;
        let val = value;
        setSortVal(val);
        const clonedProducts = JSON.parse(JSON.stringify(products));
        if(value && value.length){
            const orderedProductList = clonedProducts.products.sort((a, b) => {
                if(value.includes("Title")){ //conditions for handling based on sort values
                    return a.title.localeCompare(b.title);
                }else if(value.includes("Price Low to High")){
                    return a.price - b.price;
                }else if(value.includes("Price High to Low")){
                    return b.price - a.price;
                }
            });
            clonedProducts.products = orderedProductList;
            setProducts(clonedProducts);
        }else{ //resetting to intial way when NONE selected
            const orderedProductList = clonedProducts.products.sort((a, b) => {
               return a.id - b.id;
            });
            clonedProducts.products = orderedProductList;
            setProducts(clonedProducts);
        }
        
    };

    useEffect(() => { //handler for search term change
        //TODO: Add Debounce Effect to improve performance
        if (searchVal) {
            const token = localStorage.getItem("token");
            handleOpen(); // starting loader
            fetch(`https://dummyjson.com/auth/products/search?q=${searchVal}&limit=10&skip=${10 * (page - 1)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then((data) => {
                    setProducts(data);
                }).finally(() => {
                    //closing loader
                    handleClose();
                })
        }
    }, [searchVal]);

    useEffect(() => {
      //when page changes clearing sort value
      setSortVal('');
    },[page])


    return (<>
        <Grid container xs={12} spacing={2} style={{marginTop: "1em"}}>
        <Grid item xs={false} sm={1}></Grid>
        <Grid item xs={12} sm={5}>
            {/* Search Text field */}
            <TextField
                id="input-with-icon-textfield"
                label="Search"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
                value={searchVal}
                onChange={(e) => {
                    setSearchVal(e.target.value);
                }}
                sx={classes.textField}
            />
            <span>{searchVal ? `${products?.total} results found` : ""}</span>
        </Grid>
        <Grid item sm={5}>
            {/* Sort multi select */}
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label" sx={classes.ml15}>
                        Sort By
                    </InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={sortVal}
                        onChange={handleChange}
                        input={<OutlinedInput label="Sort By" sx={classes.ml15}/>}
                        MenuProps={MenuProps}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
        </Grid>
        <Grid item xs={false} sm={1}></Grid>
    </Grid>
    </>
    )
};

export default SearchBar;