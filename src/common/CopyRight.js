import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props) { // copyright common component
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
          Pratiksha Store
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default Copyright;