import React from "react";
import styles from "./Popup.module.scss";


interface PopupProps {
    open?: boolean;
    onOutsideClick?: () => void;
    children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children, onOutsideClick, open=false }) => {
    const css = [styles.main];
    if (open) {
        css.push(styles.open);
    }
    const classNames = css.join(' ');

    function handleOutsideClick(event: any) {
        if (onOutsideClick !== undefined && event.target.className === classNames) onOutsideClick();
    }

    return (
        <div className={classNames} onClick={handleOutsideClick}>
            <div className={styles.content}>
                { children }
            </div>
        </div>
    );
}

export default Popup;
