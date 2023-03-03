import { React, useState } from "react"
import styles from "./MainPage.module.css"

//COMPONENTS
import Header from "../components/header/Header"
import Tooltip from '@mui/material/Tooltip';
import FoodMenu from "../components/MainPage/FoodMenu";

//IMAGES
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function MainPage() {

    const [selectedFoodItemID, setSelectedFoodItemID] = useState(null); //ID of the food item selected in the food menu
    //Array of objects, each object is a food item and corresponding drink characteristics
    const [foodItems, setFoodItems] = useState([
        {
            name: "foodOne",
            drinkStats:{
                priceMin:  0, //in dollars
                priceMax: 0, //in dollars
                isPriceUsed: false,
                alcoholMin: 0,
                alcoholMax: 0, //in percent
                isAlcoholUsed: false,
                country: "",
                isCountryUsed:false,
                region: "",
                isRegionUsed:false,
                color: "red",
                isColorUsed:false,
                sweetnessMin: 0,
                sweetnessMax: 0,
                isSweetnessUsed:false,
                acidityMin:2,
                acidityMax:2,
                isAcidityUsed:false,
                tanninMin:0,
                tanninMax:0,
                isTanninUsed:false
            }
        },
        {
            name: "foodTwo",
            drinkStats:{
                priceMin:  30, //in dollars
                priceMax: 50, //in dollars
                isPriceUsed: false,
                alcoholMin: 1,
                alcoholMax: 7, //in percent
                isAlcoholUsed: false,
                country: "France",
                isCountryUsed:false,
                region: "Bordeaux",
                isRegionUsed:false,
                color: "red",
                isColorUsed:false,
                sweetnessMin: 0,
                sweetnessMax: 4,
                isSweetnessUsed:false,
                acidityMin:2,
                acidityMax:3,
                isAcidityUsed:false,
                tanninMin:30,
                tanninMax:400,
                isTanninUsed:false
            }
        },
    ]);

    return (
        <div className={styles.mainContainer}>
            <Header />
            <div className={styles.middleContainer}>
                <div className={styles.selectionPanel}>
                    {/* <div className={styles.foodSelectionPanel}> */}
                    <div className={styles.imageTitleContainer}>
                        <LocalDiningIcon className={styles.imageTitleContainerIcon} />
                        <Tooltip title="Select the food items you want to find complementary drinks for" arrow placement="right">
                            <HelpOutlineIcon className={styles.imageTitleContainerQuestion} />
                        </Tooltip>
                    </div>
                    <FoodMenu values={foodItems} setValues={setFoodItems} selectedID={selectedFoodItemID} setSelectedID={setSelectedFoodItemID}/>
                    {/* </div> */}
                </div>
                <div className={styles.resultsPanel}>

                </div>
            </div>
        </div>
    )
}