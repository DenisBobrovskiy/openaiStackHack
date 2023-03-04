import { React, useState } from "react"
import styles from "./MainPage.module.css"

//COMPONENTS
import Header from "../components/header/Header"
import Tooltip from '@mui/material/Tooltip';
import FoodMenu from "../components/MainPage/FoodMenu";

//IMAGES
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HashLoader from "react-spinners/HashLoader";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import WineBarIcon from '@mui/icons-material/WineBar';

export default function MainPage() {

    const [selectedFoodItemID, setSelectedFoodItemID] = useState(null); //ID of the food item selected in the food menu
    //Array of objects, each object is a food item and corresponding drink characteristics

    const [resultItems, setResultItems] = useState([]); //Array of objects
    const [resultWait, setResultWait] = useState(false); //Is the result loading
    const [apiKey, setApiKey] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);

    function getGlassColor(color) {
        switch (color) {
            case "red":
                return "#bf1d32"
            case "white":
                return "#dbc05e"
            case "rose":
                return "#fac2bf"
            default:
                return "orange"
        }
    }

    const [foodItems, setFoodItems] = useState([]);

    return (
        <div className={styles.mainContainer}>
            <Header apiKey={apiKey} setApiKey={setApiKey} />
            <div className={styles.middleContainer}>
                <div className={styles.selectionPanel}>
                    {/* <div className={styles.foodSelectionPanel}> */}
                    <div className={styles.imageTitleContainer}>
                        <LocalDiningIcon className={styles.imageTitleContainerIcon} />
                        <Tooltip title="Select the food items you want to find complementary drinks for" arrow placement="right">
                            <HelpOutlineIcon className={styles.imageTitleContainerQuestion} />
                        </Tooltip>
                    </div>
                    <FoodMenu setErrorMsg={setErrorMsg} apiKey={apiKey} setApiKey={setApiKey} values={foodItems} setValues={setFoodItems} selectedID={selectedFoodItemID} setSelectedID={setSelectedFoodItemID} setResultItems={setResultItems} setResultWait={setResultWait} />
                    {/* </div> */}
                </div>
                <div className={styles.resultsPanel}>
                    {resultWait &&
                        <div className={styles.loaderContainer}>
                            <HashLoader color={"orange"} loading={resultWait} size={150} />
                        </div>
                    }
                    {!resultWait && resultItems.length === 0 && !errorMsg &&
                        <div className={styles.noResultsContainer}>
                            Click "Generate wine list" to generate corresponding wines for the food menu items
                        </div>
                    }
                    {!resultWait && resultItems.length > 0 && !errorMsg &&
                        resultItems.map((value, index) => (
                            <div className={styles.wineResultContainer} key={value.foodName}>
                                <div className={styles.wineResultContainerIndex}>
                                    <b>{index + 1}) </b>
                                </div>
                                <WineBarIcon className={styles.wineIcon} style={{ color: getGlassColor(value.color) }} />
                                <div className={styles.wineNameContainer}>{value.name}</div>
                                <DinnerDiningIcon style={{ marginRight: 30, marginLeft: 70, transform: "scale(2)", color: "orange" }} />
                                <div className={styles.foodNameContainer}>{value.foodName}</div>
                                <div style={{ width: 30 }} />
                                <div className={styles.descriptionContainer}>
                                    {value.description}
                                </div>
                            </div>
                        ))
                    }
                    {errorMsg &&
                        <div className={styles.errorMsgContainer}>
                            Bad API key
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}