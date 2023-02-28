import {React,useState,useEffect} from "react"
import styles from "./FoodMenu.module.css"

//COMPONENTS
import { Tooltip } from "@mui/material";

//IMAGES
import GetAppIcon from '@mui/icons-material/GetApp';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function FoodMenu(props) {

    const { values, setValues } = props; //Menu items, array of strings
    
    useEffect(() =>{
        setValues(["one", "two", "three", "four", "five","six"])
    },[])

    function removeItem(index){
        let newValues = [...values];
        newValues.splice(index,1);
        setValues(newValues);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.menuPanel}>
                {values.map((value, index) => (
                    <div className={styles.menuItem} key={index}>{value}</div>
                ))}
                <div className={styles.menuItem} onClick={removeItem}>Add item</div>
            </div>
            <div className={styles.buttonsContainer}>
                <Tooltip arrow placement="right" title="Upload a CSV file of menu items">
                    <div className={styles.buttonContainer}>
                        <GetAppIcon className={styles.buttonContainerIcon} />
                    </div>
                </Tooltip>
                <Tooltip arrow placement="right" title="Upload a picture of the menu">
                    <div className={styles.buttonContainer}>
                        <AddAPhotoIcon className={styles.buttonContainerIcon} />
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}