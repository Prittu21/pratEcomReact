import { AppBar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
    toolbar: {
        // display: "flex",
        // justifyContent: "space-between"
    },
    profile: {
        height: "1.6em",
        width: "1.6em"
    },
    fName: {
        fontSize: '0.8em',
        paddingLeft: '0.5em'
    },
    cart: {
        marginRight: "1em"
    }
}

function WithNavBar(WrappedComponent, userInfo) {
    const { firstName = "", lastName = "", image = "" } = {} = userInfo;
    const navigate = useNavigate();
    

    return (props) => {
        return (
            <>
                <Grid container xs={12}>
                    <AppBar position="static">
                        <Toolbar style={classes.toolbar}>
                            <Typography
                                style={classes.appbarTypography}
                                variant="h6"
                                component="div" sx={{ flexGrow: 1, textAlign:"left" }}
                            >
                                ECommerce
                            </Typography>
                            <div>
                                <IconButton color="inherit" disableRipple
                                    aria-label="account of current user"
                                >
                                    <ShoppingCartIcon style={classes.cart} />
                                    {image ? <img src={image} alt="" style={classes.profile} /> : <SupervisedUserCircleIcon />}
                                    <span style={classes.fName}>{firstName}</span>
                                </IconButton>
                                <IconButton onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/");
                                }}
                                title="Logout"
                                style={{color: "#fff"}}
                                >
                                    <PowerSettingsNewIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <WrappedComponent {...props} />
            </>
        )
    }
};

export default WithNavBar;