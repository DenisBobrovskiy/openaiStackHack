import { React, useState } from "react"
import styles from "./Header.module.css"
import classNames from "classnames";

//IMAGES
import { ReactComponent as Logo } from "../../images/logo.svg"
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CancelIcon from '@mui/icons-material/Cancel';

import { TextField } from "@mui/material";

export default function Header(props) {

    const [aboutPanelDisplayed, setAboutPanelDisplayed] = useState(false)
    const {apiKey,setApiKey} = props;

    return (
        <div className={styles.mainContainer}>
            <Logo className={styles.mainLogo} />
            <div className={styles.buttonContainer} onClick={() => { setAboutPanelDisplayed(!aboutPanelDisplayed) }}>
                <ContactSupportIcon className={styles.buttonContainerIcon} />
                <div className={classNames(styles.buttonContainerText, styles.hoverUnderlineAnimation)}>About the project</div>
            </div>
            <div style={{ width: 60 }} />
            <div className={styles.apiKeyContainer}>
                <TextField value={apiKey} onChange={(event) => {setApiKey(event.target.value); }} variant="standard" sx={{ input: { color: 'white' } }} label="Enter OpenAI API Key" InputLabelProps={{
                    style: { color: 'white' },
                }} />
            </div>
            {aboutPanelDisplayed &&
                <div className={styles.aboutProjectContainer}>
                    <CancelIcon className={styles.closeIcon} onClick={() => { setAboutPanelDisplayed(!aboutPanelDisplayed) }}></CancelIcon>
                    <div className={styles.headerText}>
                        About
                    </div>
                    <div className={styles.aboutPanelText}>
                        This app is a proof of concept for a project that aims to help restaurant owners and wine distributors find the best wine and food pairings.
                        Eventually this app can be used as a general assistant tool with further features added on top of this MVP. We utilize the GPT-3 model to generate the output.
                    </div>
                </div>
            }
        </div>
    )
}