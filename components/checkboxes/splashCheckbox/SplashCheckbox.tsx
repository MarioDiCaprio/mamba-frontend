import React from "react";
import styles from "./SplashCheckbox.module.scss";


interface SplashCheckboxProps {
    label?: string | number | JSX.Element;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const SplashCheckbox: React.FC<SplashCheckboxProps> = (props) => {
    return (
        <div className={styles.container}>
            {/* Checkbox */}
            <div className={styles.wrapper}>
                <input className={styles.checkbox} type="checkbox" {...props.inputProps} />
                <svg className={styles.svg} width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path className={styles.path} d="M2 8.36364L6.23077 12L13 2" />
                </svg>
            </div>
            {/* Label */}
            <span className={ styles.label }>
                { props.label }
            </span>
        </div>
    );
}

export default SplashCheckbox;
