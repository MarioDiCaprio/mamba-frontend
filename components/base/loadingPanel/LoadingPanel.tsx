import React from "react";
import styles from "./LoadingPanel.module.scss";


/**
 * This is the loading panel for the `Base`'s sidebar, which is
 * rendered when the user's data is being fetched. It contains a
 * skeleton with a pulsing animation.
 * @returns The loading panel
 */
const LoadingPanel: React.FC = () => {
    return (
        <div className={styles.loadingPanel}>
            <span className={styles.boxSkeleton} />
            <span className={styles.lineSkeleton} />
            <span className={styles.lineSkeleton} />
        </div>
    );
}

export default LoadingPanel;
