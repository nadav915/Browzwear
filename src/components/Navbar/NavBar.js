import React from 'react';
import classes from './NavBar.css'

const navbar = (props) =>{
    return (
        <React.Fragment>
        <nav className={classes.Nav}>
        <font >Countries </font>
        <font>Cities</font>
        <font>Company</font>
        <font className={classes.Font}>Map</font>
        </nav>     
        <hr/>
        </React.Fragment>
        
    );
}

export default navbar;