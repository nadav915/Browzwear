import React from 'react';
import classes from './Datalist.css';

const datalist = (props) =>{
    return (<div className={classes.Container}>
        <ul>
        {
            props.elements.map(ele=>{
                return <li className={props.selected===ele ? classes.SelectedItem : classes.Item} onClick={()=>props.click(ele,props.numOfList)} key={ele}>{ele}</li>
            })
        } 
        </ul>
    </div>

    );
}

export default datalist;