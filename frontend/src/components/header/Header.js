import React from "react"
import styles from "./Header.module.css"
import classNames from "classnames";

//IMAGES
import {ReactComponent as Logo} from "../../images/logo.svg"
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function Header(){
    return(
        <div className={styles.mainContainer}>
            <Logo className={styles.mainLogo}/>
            <div className={styles.buttonContainer}>
                <ContactSupportIcon className={styles.buttonContainerIcon}/>
                <div className={classNames(styles.buttonContainerText,styles.hoverUnderlineAnimation)}>About us</div>
            </div>
        </div>
    )
}