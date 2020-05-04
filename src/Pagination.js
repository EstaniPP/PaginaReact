import React from "react";
import { Button, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
       padding: theme.spacing(1),
       flexShrink: 0,
    },
}));

export default function Pagination(props) {
    const classes = useStyles()
    const {decrement , increment, offSet} = props

    return(
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            <Button size="small" disableElevation onClick={decrement.bind(this)}>{'< Anterior'}</Button>
            <Typography> {"Pagina "+((offSet/20)+1)} </Typography>
            <Button size="small" disableElevation onClick={increment.bind(this)}>{"Siguiente >"}</Button>
        </Toolbar>
    );
}