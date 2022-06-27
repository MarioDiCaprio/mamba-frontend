import React from "react";
import styles from './GlowingButton.module.scss';


interface GlowingButtonProps {
    children?: React.ReactNode;
}

const GlowingButton: React.FC<GlowingButtonProps> = (props) => {
    return (
        <div className={styles.wrapper}>
            <button className={styles.button}>
                { props.children }
            </button>
        </div>
    );
}

export default GlowingButton;
