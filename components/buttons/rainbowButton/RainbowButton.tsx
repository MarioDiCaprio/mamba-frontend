import React, { HTMLAttributes } from "react";
import styles from "./RainbowButton.module.scss";


interface RainbowButtonProps {
    buttonProps?: Omit<HTMLAttributes<HTMLButtonElement>, 'className'>;
    children?: React.ReactNode;
}

const RainbowButton: React.FC<RainbowButtonProps> = ({ buttonProps, children }) => {
    return (
        <button className={styles.button} {...buttonProps}>
            <div className={styles.buttonInner}>
                <div className={styles.buttonText}>
                    { children }
                </div>
            </div>
        </button>
    );
}

export default RainbowButton;
