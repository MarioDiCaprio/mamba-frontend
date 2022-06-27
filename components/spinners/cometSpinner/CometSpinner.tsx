import React from "react";
import styles from "./CometSpinner.module.scss";


const CometSpinner: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.face}>
                <div className={styles.circle} />
            </div>
            <div className={styles.face}>
                <div className={styles.circle} />
            </div>
        </div>
    );
}

export default CometSpinner;
