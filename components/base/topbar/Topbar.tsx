import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { BiUserPlus as AddUserIcon } from 'react-icons/bi';
import { BiBell as NotificationsIcon } from 'react-icons/bi';
import styles from "./Topbar.module.scss";
import { User } from "../../../graphql/types";
import convertBinaryProfilePicture from "../../../utils/convertBinaryProfilePicture";


/**
 * The props for one {@link BtnMenuItem}.
 */
interface BtnMenuItemProps {
    /** The component's ID */
    id: string;
    /** An icon for the button component */
    icon: JSX.Element;
    /** Whether the collapsed menu is opened */
    open?: boolean;
    /** The title for the collapsed menu */
    title?: string;
    /** Event that is triggered when the button component is clicked */
    onClick?: (id: string) => void;
    /** The children (rendered inside the collapsed menu) */
    children?: React.ReactNode;
}

/**
 * This is one menu item. It consists of a button and a collapsible menu.
 * @param param0 The props for this component
 * @returns The component
 * @see {@link BtnMenuItemProps}
 */
const BtnMenuItem: React.FC<BtnMenuItemProps> = ({ id, icon, title, children, onClick, open=false }) => {
    /** The styles to be applied to the component's collapsible */
    const collapsibleMenuCss = [styles.collapsedMenu];

    /** The styles to be applied to the component's icon button */
    const menuIconCss = [styles.menuIcon];

    if (open) {
        collapsibleMenuCss.push(styles.collapsedShow);
        menuIconCss.push(styles.menuIconActive);
    } 

    /** Handles a click of this component's button */
    function handleClick() {
        if (onClick !== undefined) onClick(id);
    }

    return (
        <div id={id} className={styles.menuItem}>
            {/* Button */}
            <div id={`${id}-icon`} className={menuIconCss.join(' ')} role="button" onClick={handleClick}>
                { icon }
            </div>
            {/* Collapsible Menu */}
            <div id={`${id}-collapsed`} className={collapsibleMenuCss.join(' ')}>
                {/* Menu title */}
                <div className={styles.collapsedMenuTitle}>
                    { title }
                </div>
                {/* Menu content */}
                <div className={styles.collapsedMenuContent}>
                    { children }
                </div>
            </div>
        </div>
    );
}


interface BtnMenuProps {
    user?: User;
}

/**
 * This is the menu of the `Topbar`. It is the series
 * of button collapsibles on the right side of the
 * bar. This component also handles `onClick` events for
 * the menu items.
 * @returns The component
 */
const BtnMenu: React.FC<BtnMenuProps> = ({ user }) => {
    /** Handles the currently opened collapsible menu by saving its ID */
    const [active, setActive] = useState<string | undefined>(undefined);

    /** Handles a click of a menu button component */
    function handleClick(id: string) {
        if (id === active) {
            setActive(undefined);
        } else {
            setActive(id);
        }
    }

    /** The user's profile picture if logged in or a link to the login page otherwise */
    const PictureOrLogin = () => {
        // if user not logged in: link to login page
        if (user === undefined) {
            return (
                <div className={styles.loginLink} data-test="loginLink">
                    <Link href="/">Login</Link>
                </div>
            );
        }
        return (
            <div data-test="accountLink">
                { convertBinaryProfilePicture(user?.profilePicture, { className: styles.menuIcon}) }
            </div>
        );
    }

    return (
        <div className={styles.menu}>
            {/* "Add User" menu */}
            <BtnMenuItem
                id="add-user"
                title="Friend Requests"
                icon={<AddUserIcon />}
                open={active==='add-user'}
                onClick={handleClick}
            />
            {/* "Notifications" menu */}
            <BtnMenuItem
                id="notifications"
                title="Notifications"
                icon={<NotificationsIcon />}
                open={active==='notifications'}
                onClick={handleClick}
            />
            {/* Profile picture or login link */}
            <PictureOrLogin />
        </div>
    );
}


interface TopbarProps {
    user?: User;
}

/**
 * The `base`'s topbar. It contains a search field and a collection of
 * button menus.
 * @returns The topbar component
 */
const Topbar: React.FC<TopbarProps> = ({ user }) => {
    return (
        <div className={styles.topbar}>
            {/* Search field */}
            <div className={styles.searchWrapper}>
                <SearchIcon />
                <input placeholder="Search..." className={styles.search} />
            </div>
            {/* Button menu */}
            <BtnMenu user={user} />
        </div>
    );
}

export default Topbar;
