import { React, useState, useEffect } from "react"
import styles from "./FoodMenu.module.css"
import classNames from "classnames";
import { createTheme, ThemeProvider } from "@mui/material";

//COMPONENTS
import { Tooltip } from "@mui/material";
import { Button, Slider, Checkbox, Menu, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

//IMAGES
import GetAppIcon from '@mui/icons-material/GetApp';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { StyleSharp } from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import PublicIcon from '@mui/icons-material/Public';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import WineBarIcon from '@mui/icons-material/WineBar';
import InfoIcon from '@mui/icons-material/Info';
import FlareIcon from '@mui/icons-material/Flare';
import GradientIcon from '@mui/icons-material/Gradient';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

//CUSTOM THEME
const theme = createTheme({
    palette: {
        primary: {
            main: '#dd8613',
        },
    },
});



export default function FoodMenu(props) {

    const franceRegions = ['Bordeaux', 'Burgundy', 'Champagne', 'Loire Valley', 'Rhone Valley'];
    const italyRegions = ['Piedmont', 'Tuscany', 'Veneto', 'Sicily', 'Friuli-Venezia Giulia'];
    const spainRegions = ['Rioja', 'Ribera del Duero', 'Priorat', 'Galicia', 'Jerez'];
    const usRegions = ['Napa Valley', 'Sonoma', 'Willamette Valley', 'Central Coast', 'Columbia Valley'];
    const argentinaRegions = ['Mendoza', 'Salta', 'San Juan', 'La Rioja', 'Patagonia'];
    const chileRegions = ['Maipo Valley', 'Casablanca Valley', 'Colchagua Valley', 'Limari Valley', 'Aconcagua Valley'];
    const australiaRegions = ['Barossa Valley', 'Hunter Valley', 'Yarra Valley', 'Margaret River', 'Coonawarra'];
    const germanyRegions = ['Mosel', 'Rheingau', 'Pfalz', 'Baden', 'Franconia'];
    const portugalRegions = ['Douro Valley', 'Alentejo', 'Bairrada', 'Vinho Verde', 'Dao'];
    const southAfricaRegions = ['Stellenbosch', 'Franschhoek', 'Paarl', 'Constantia', 'Hemel-en-Aarde'];


    const { values, setValues, selectedID, setSelectedID } = props; //Menu items, array of strings
    const [newItemText, setNewItemText] = useState(""); //Text in the new item input field
    const [isItemInputOpen, setIsItemInputOpen] = useState(false); //Is the new item input field open

    //OPTIONS (TEMPORARY VALUES, ASSIGN THEM TO VALUES WHEN ITEM SWITCHED OR SUBMITTED)
    const [priceRange, setPriceRange] = useState([0, 0]); //Price range of the drink
    const [priceRangeUsed, setPriceRangeUsed] = useState(false);
    const [abvRange, setAbvRange] = useState([0, 0]); //Price range of the drink
    const [abvRangeUsed, setAbvRangeUsed] = useState(false);
    const [country, setCountry] = useState("");
    const [countryUsed, setCountryUsed] = useState(false);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState("");
    const [regionUsed, setRegionUsed] = useState(false);
    const [color, setColor] = useState("");
    const [colorUsed, setColorUsed] = useState(false);

    const [redWine, setRedWine] = useState(false);
    const [whiteWine, setWhiteWine] = useState(false);
    const [roseWine, setRoseWine] = useState(false);

    const [sweetnessRange, setSweetnessRange] = useState([0, 0]);
    const [sweetnessRangeUsed, setSweetnessRangeUsed] = useState(false);

    const [acidityRange, setAcidityRange] = useState([0, 0]);
    const [acidityRangeUsed, setAcidityRangeUsed] = useState(false);

    const [tanninRange, setTanninRange] = useState([0, 0]);
    const [tanninRangeUsed, setTanninRangeUsed] = useState(false);

    // useEffect(() =>{
    //     setValues(["one", "two", "three", "four", "five","six"])
    // },[])

    function updateRegions(countryName) {
        switch (countryName) {
            case "France":
                setRegions(franceRegions)
                break;
            case "Italy":
                setRegions(italyRegions)
                break
            case "United States":
                setRegions(usRegions);
                break
            case "Argentina":
                setRegions(argentinaRegions);
                break;
            case "Chile":
                setRegions(chileRegions);
                break;
            case "Australia":
                setRegions(australiaRegions);
                break;
            case "Spain":
                setRegions(spainRegions)
                break
            case "Germany":
                setRegions(germanyRegions)
                break;
            case "Portugal":
                setRegions(portugalRegions)
                break;
            case "South Africa":
                setRegions(southAfricaRegions)
                break;
            default:
                setRegions([])
                break;
        }
    }

    function getOptionValues(index) {
        //Use current selectedID to get the values of the options
        console.log(index);
        setPriceRange([values[index].drinkStats.priceMin, values[index].drinkStats.priceMax])
        setAbvRange([values[index].drinkStats.alcoholMin, values[index].drinkStats.alcoholMax])
        setCountry(values[index].drinkStats.country)
        updateRegions(values[index].drinkStats.country)
        setRegion(values[index].drinkStats.region)
        setCountryUsed(values[index].drinkStats.isCountryUsed)
        setRegionUsed(values[index].drinkStats.isRegionUsed)
        setPriceRangeUsed(values[index].drinkStats.isPriceUsed)
        setAbvRangeUsed(values[index].drinkStats.isAlcoholUsed)

        setColor(values[index].drinkStats.color)
        setColorUsed(values[index].drinkStats.isColorUsed)
        if (values[index].drinkStats.color == "red") {
            setColor("red")
            setRedWine(true)
            setWhiteWine(false)
            setRoseWine(false)
        } else if (values[index].drinkStats.color == "white") {
            setColor("white")
            setWhiteWine(true)
            setRedWine(false)
            setRoseWine(false)
        } else if (values[index].drinkStats.color == "rose") {
            setColor("rose")
            setRoseWine(true)
            setRedWine(false)
            setWhiteWine(false)
        }

        setSweetnessRange([values[index].drinkStats.sweetnessMin, values[index].drinkStats.sweetnessMax])
        setSweetnessRangeUsed(values[index].drinkStats.isSweetnessUsed)
        setAcidityRange([values[index].drinkStats.acidityMin, values[index].drinkStats.acidityMax])
        setAcidityRangeUsed(values[index].drinkStats.isAcidityUsed)
        setTanninRange([values[index].drinkStats.tanninMin, values[index].drinkStats.tanninMax])
        setTanninRangeUsed(values[index].drinkStats.isTanninUsed)
    }

    function setOptionValues() {
        let newValues = [...values];
        //Save price range
        newValues[selectedID].drinkStats.priceMin = priceRange[0];
        newValues[selectedID].drinkStats.priceMax = priceRange[1];
        newValues[selectedID].drinkStats.isPriceUsed = priceRangeUsed;
        newValues[selectedID].drinkStats.alcoholMin = abvRange[0];
        newValues[selectedID].drinkStats.alcoholMax = abvRange[1];
        newValues[selectedID].drinkStats.isAlcoholUsed = abvRangeUsed;
        newValues[selectedID].drinkStats.country = country;
        newValues[selectedID].drinkStats.isCountryUsed = countryUsed;
        newValues[selectedID].drinkStats.region = region;
        newValues[selectedID].drinkStats.isRegionUsed = regionUsed;
        newValues[selectedID].drinkStats.color = color;
        newValues[selectedID].drinkStats.isColorUsed = colorUsed;
        newValues[selectedID].drinkStats.sweetnessMin = sweetnessRange[0];
        newValues[selectedID].drinkStats.sweetnessMax = sweetnessRange[1];
        newValues[selectedID].drinkStats.isSweetnessUsed = sweetnessRangeUsed;
        newValues[selectedID].drinkStats.acidityMin = acidityRange[0];
        newValues[selectedID].drinkStats.acidityMax = acidityRange[1];
        newValues[selectedID].drinkStats.isAcidityUsed = acidityRangeUsed;
        newValues[selectedID].drinkStats.tanninMin = tanninRange[0];
        newValues[selectedID].drinkStats.tanninMax = tanninRange[1];
        newValues[selectedID].drinkStats.isTanninUsed = tanninRangeUsed;

        setValues(newValues);
    }

    function removeItem(index) {
        let newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
        setSelectedID(null);
    }

    function addItem(foodName) {
        let newValues = [...values];
        newValues.push({
            name: foodName, drinkStats:
            {
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
        });
        setValues(newValues);
    }

    const handleBlur = (event) => {
        setIsItemInputOpen(false);
        setNewItemText(newItemText.trim());
        if (newItemText.length === 0) return;
        addItem(newItemText);
        setNewItemText("");

    };

    const handleChange = (event) => {
        setNewItemText(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleAbvRangeChange = (event, newValue) => {
        setAbvRange(newValue);
    };

    function priceRangeValueText(value) {
        return `${value} fefe$`;
    }

    function itemSelected(index) {
        console.log(values);
        if (selectedID != null) {
            setOptionValues();
        }
        setSelectedID(index);
        getOptionValues(index);
        console.log("item selected: " + values[index].name + " at index: " + index)
    }

    function enableItemInput() {
        setIsItemInputOpen(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.mainMainContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.menuPanel}>
                        {values.map((value, index) => (
                            <div className={selectedID == index ? classNames(styles.activeMenuItem, styles.menuItem) : styles.menuItem} key={index} onClick={() => { itemSelected(index) }}><DinnerDiningIcon className={styles.menuItemIcon} />{value.name}</div>
                        ))}
                        <div className={classNames(styles.menuItem, styles.newItemInput)}
                            onClick={enableItemInput}
                            // contentEditable={isItemInputOpen ? true : false}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                        >
                            {isItemInputOpen ? <input placeholder="Input new food item" autoFocus value={newItemText} onChange={handleChange} onBlur={handleBlur} type="text" /> : <ControlPointIcon />}
                        </div>
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

                {selectedID != null &&
                    <div className={styles.optionsMenu}>
                        <Button variant="contained" onClick={() => (removeItem(selectedID))} className={styles.buttonStyle} >Delete item</Button>

                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !colorUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={colorUsed}
                                    onChange={() => { colorUsed ? setColorUsed(false) : setColorUsed(true) }}
                                />
                            </div>
                            <InvertColorsIcon className={styles.priceRangeIcon} />
                            <div style={{ width: 10 }} />
                            <div className={styles.priceRangeText}>Wine colour:</div>
                            <div className={styles.wineIconContainer}>
                                <WineBarIcon className={styles.wineIcon} style={colorUsed ? { color: "#bf1d32" } : { color: "gray" }} />
                                <Tooltip title="Red wine" placement="right" style={{ cursor: "pointer" }}>
                                    <InfoIcon className={styles.wineQuestionIcon} />
                                </Tooltip>
                                <div className={styles.checkboxContainerWine}>
                                    <Checkbox
                                        disabled={colorUsed ? false : true}
                                        checked={redWine}
                                        onChange={() => { setRedWine(!redWine); setRoseWine(false); setWhiteWine(false); setColor("red") }}
                                    />
                                </div>
                            </div>
                            <div className={styles.wineIconContainer}>
                                <WineBarIcon className={styles.wineIcon} style={colorUsed ? { color: "#dbc05e" } : { color: "gray" }} />
                                <Tooltip title="White wine" placement="right" style={{ cursor: "pointer" }}>
                                    <InfoIcon className={styles.wineQuestionIcon} />
                                </Tooltip>
                                <div className={styles.checkboxContainerWine}>
                                    <Checkbox
                                        disabled={colorUsed ? false : true}
                                        checked={whiteWine}
                                        onChange={() => { setWhiteWine(!whiteWine); setRedWine(false); setRoseWine(false); setColor("white") }}
                                    />
                                </div>
                            </div>
                            <div className={styles.wineIconContainer}>
                                <WineBarIcon className={styles.wineIcon} style={colorUsed ? { color: "#fac2bf" } : { color: "gray" }} />
                                <Tooltip title="Rose wine" placement="right" style={{ cursor: "pointer" }}>
                                    <InfoIcon className={styles.wineQuestionIcon} />
                                </Tooltip>
                                <div className={styles.checkboxContainerWine}>
                                    <Checkbox
                                        disabled={colorUsed ? false : true}
                                        checked={roseWine}
                                        onChange={() => { setRoseWine(!roseWine); setRedWine(false); setWhiteWine(false); setColor("rose") }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !priceRangeUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={priceRangeUsed}
                                    onChange={() => { priceRangeUsed ? setPriceRangeUsed(false) : setPriceRangeUsed(true) }}
                                />
                            </div>
                            <AttachMoneyIcon className={styles.priceRangeIcon} />
                            <div className={styles.priceRangeText}>Price range (USD)</div>
                            <Slider
                                disabled={priceRangeUsed ? false : true}
                                getAriaLabel={() => 'Price range'}
                                value={priceRangeUsed ? priceRange : [0, 300]}
                                onChange={handlePriceRangeChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={priceRangeValueText}
                                min={0}
                                max={300}
                            />
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !abvRangeUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={abvRangeUsed}
                                    onChange={() => { abvRangeUsed ? setAbvRangeUsed(false) : setAbvRangeUsed(true) }}
                                // checked={isChecked}
                                // onChange={handleCheckChange}
                                />
                            </div>
                            <PercentIcon className={styles.abvRangeIcon} />
                            <div className={styles.priceRangeText}>ABV(%)</div>
                            <Slider
                                step={0.1}
                                disabled={abvRangeUsed ? false : true}
                                getAriaLabel={() => 'ABV range'}
                                value={abvRangeUsed ? abvRange : [0, 23]}
                                onChange={handleAbvRangeChange}
                                valueLabelDisplay="auto"
                                // getAriaValueText={priceRangeValueText}
                                min={0}
                                max={23}
                            />
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !countryUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={countryUsed}
                                    onChange={() => { countryUsed ? setCountryUsed(false) : setCountryUsed(true) }}
                                // checked={isChecked}
                                // onChange={handleCheckChange}
                                />
                            </div>
                            <PublicIcon className={styles.abvRangeIcon} />
                            <div className={styles.priceRangeText}>Country of origin:</div>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    sx={{ backgroundColor: "white" }}
                                    disabled={countryUsed ? false : true}
                                    inputProps={{
                                        MenuProps: {
                                            MenuListProps: {
                                                sx: {
                                                    backgroundColor: 'white'
                                                }
                                            }
                                        }
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={countryUsed ? country : ""}
                                    label="Country"
                                    onChange={(event) => { setCountry(event.target.value); updateRegions(event.target.value) }}
                                >
                                    <MenuItem value={"France"}>France</MenuItem>
                                    <MenuItem value={"Spain"}>Spain</MenuItem>
                                    <MenuItem value={"Australia"}>Australia</MenuItem>
                                    <MenuItem value={"Italy"}>Italy</MenuItem>
                                    <MenuItem value={"South Africa"}>South Africa</MenuItem>
                                    <MenuItem value={"Chile"}>Chile</MenuItem>
                                    <MenuItem value={"United States"}>United States</MenuItem>
                                    <MenuItem value={"Argentina"}>Argentina</MenuItem>
                                    <MenuItem value={"Germany"}>Germany</MenuItem>
                                    <MenuItem value={"Portugal"}>Portugal</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{ width: 60 }} />
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    disabled={countryUsed ? false : true}
                                    checked={regionUsed}
                                    onChange={() => { regionUsed ? setRegionUsed(false) : setRegionUsed(true) }}
                                />
                            </div>
                            <PublicIcon className={classNames(styles.abvRangeIcon, { [styles.disabledRangeContainer]: (!countryUsed || !regionUsed) })} />
                            <div className={classNames(styles.priceRangeText, { [styles.disabledRangeContainer]: (!countryUsed || !regionUsed) })}>Region:</div>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                                <Select
                                    disabled={(countryUsed && regionUsed) ? false : true}
                                    sx={{ backgroundColor: "white" }}
                                    inputProps={{
                                        MenuProps: {
                                            MenuListProps: {
                                                sx: {
                                                    backgroundColor: 'white'
                                                }
                                            }
                                        }
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={(countryUsed && regionUsed) ? region : ""}
                                    label="Region"
                                    onChange={(event) => { setRegion(event.target.value) }}
                                >
                                    {regions.map((value, index) => (
                                        <MenuItem key={index} value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !sweetnessRangeUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={sweetnessRangeUsed}
                                    onChange={() => { sweetnessRangeUsed ? setSweetnessRangeUsed(false) : setSweetnessRangeUsed(true) }}
                                // checked={isChecked}
                                // onChange={handleCheckChange}
                                />
                            </div>
                            <FlareIcon className={styles.abvRangeIcon} />
                            <div className={styles.priceRangeText}>Sweetness (0-9)</div>
                            <Tooltip arrow placement="right" title="0: Bone dry, with no perceptible sweetness;       
                            1-2: Off-dry, with a hint of sweetness and a slight perception of sugar;
                            3-4: Medium-dry, with a noticeable sweetness and a soft, round mouthfeel;
                            5-6: Medium-sweet, with a pronounced sweetness and a rich, full-bodied mouthfeel;
                            7-9: Sweet, with a very high level of sweetness and a syrupy, thick mouthfeel;">
                                <InfoIcon className={styles.infoIcon2} />
                            </Tooltip>
                            <Slider
                                disabled={sweetnessRangeUsed ? false : true}
                                getAriaLabel={() => 'ABV range'}
                                value={sweetnessRangeUsed ? sweetnessRange : [0, 9]}
                                onChange={(event, newValue) => { setSweetnessRange(newValue) }}
                                valueLabelDisplay="auto"
                                step={0.1}
                                // getAriaValueText={priceRangeValueText}
                                min={0}
                                max={9}
                            />
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !acidityRangeUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={acidityRangeUsed}
                                    onChange={() => { acidityRangeUsed ? setAcidityRangeUsed(false) : setAcidityRangeUsed(true) }}
                                // checked={isChecked}
                                // onChange={handleCheckChange}
                                />
                            </div>
                            <GradientIcon className={styles.abvRangeIcon} />
                            <div className={styles.priceRangeText}>Acidity (2-5 pH)</div>
                            <Tooltip arrow placement="right" title="Lower values represent higher acidity on the pH scale">
                                <InfoIcon className={styles.infoIcon3} />
                            </Tooltip>
                            <Slider
                                disabled={acidityRangeUsed ? false : true}
                                getAriaLabel={() => 'ABV range'}
                                value={acidityRangeUsed ? acidityRange : [2, 5]}
                                onChange={(event, newValue) => { setAcidityRange(newValue) }}
                                valueLabelDisplay="auto"
                                step={0.05}
                                // getAriaValueText={priceRangeValueText}
                                min={2}
                                max={5}
                            />
                        </div>
                        <div className={classNames(styles.priceRangeContainer, { [styles.disabledRangeContainer]: !tanninRangeUsed })}>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    checked={tanninRangeUsed}
                                    onChange={() => { tanninRangeUsed ? setTanninRangeUsed(false) : setTanninRangeUsed(true) }}
                                // checked={isChecked}
                                // onChange={handleCheckChange}
                                />
                            </div>
                            <ScatterPlotIcon className={styles.abvRangeIcon} />
                            <div className={styles.priceRangeText}>Tannins (0-1000mg/L)</div>
                            <Tooltip arrow placement="right" title="Lighter bodied red wines can be found in the range of 100-150mg/L, while more full bodied reds can go up to 300-500
                            mg/L. White wines will typically be much less at 50mg/L or lower">
                                <InfoIcon className={styles.infoIcon3} />
                            </Tooltip>
                            <Slider
                                disabled={tanninRangeUsed ? false : true}
                                getAriaLabel={() => 'ABV range'}
                                value={tanninRangeUsed ? tanninRange : [0, 1000]}
                                onChange={(event, newValue) => { setTanninRange(newValue) }}
                                valueLabelDisplay="auto"
                                // getAriaValueText={priceRangeValueText}
                                min={0}
                                max={1000}
                            />
                        </div>
                    </div>
                }
                <div className={styles.submitButtonContainer}>
                    <Button variant="contained" size="large">Generate wine list</Button>
                </div>
            </div>
        </ThemeProvider>
    )
}