import { React, useState } from "react"
import styles from "./Header.module.css"
import classNames from "classnames";

//IMAGES
import { ReactComponent as Logo } from "../../images/logo.svg"
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Header() {

    const [aboutPanelDisplayed, setAboutPanelDisplayed] = useState(false)

    return (
        <div className={styles.mainContainer}>
            <Logo className={styles.mainLogo} />
            <div className={styles.buttonContainer} onClick={()=>{setAboutPanelDisplayed(!aboutPanelDisplayed)}}>
                <ContactSupportIcon className={styles.buttonContainerIcon} />
                <div className={classNames(styles.buttonContainerText, styles.hoverUnderlineAnimation)}>About the project</div>
            </div>
            {aboutPanelDisplayed &&
                <div className={styles.aboutProjectContainer}>
                    <CancelIcon className={styles.closeIcon} onClick={()=>{setAboutPanelDisplayed(!aboutPanelDisplayed)}}></CancelIcon>
                    <div className={styles.headerText}>
                        About
                    </div>
                </div>
            }
        </div>
    )
}