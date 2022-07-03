import React from "react";
import Popup from "../popup/Popup";
import CometSpinner from "../spinners/cometSpinner/CometSpinner";
import styles from "./LoadingScreen.module.scss";


interface LoadingScreenProps {
    open: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open }) => {
    return (
        <Popup open={open}>
            <div className={styles.content} data-test="loadingScreen">
                <CometSpinner />
            </div>
        </Popup>
    );
}

export default LoadingScreen;
