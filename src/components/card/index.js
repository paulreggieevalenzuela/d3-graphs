import React from "react";
import { makeStyles } from '@mui/styles';
import MaterialCard from "@mui/material/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "10px 10px 6px #000029",
    padding: 20,
  },
}));

const Card = (props) => {
  const classes = useStyles();
  return <MaterialCard className={classes.root}>{props.children}</MaterialCard>;
};

export default Card;
