import {React,useState} from "react"
import styles from "./MainPage.module.css"

//COMPONENTS
import Header from "../components/header/Header"
import Tooltip from '@mui/material/Tooltip';
import FoodMenu from "../components/MainPage/FoodMenu";

//IMAGES
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function MainPage() {

    const [foodItems, setFoodItems] = useState(["one","two","thre","four","five"]);

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
                        <FoodMenu values={foodItems} setValues={setFoodItems}/>
                    {/* </div> */}
                </div>
                <div className={styles.resultsPanel}>

                </div>
            </div>
        </div>
    )
}