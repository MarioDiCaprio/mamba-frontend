import React from "react";
import styles from "./CometSpinner.module.scss";


/**
 * This is a spinner that entails two orbiting comets.
 * @returns The component
 */
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
