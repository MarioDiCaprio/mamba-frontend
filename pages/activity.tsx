import type { NextPage } from "next";
import React from "react";
import Base from "../components/base/Base";
import FeedLoader from "../components/_activity/feedLoader/FeedLoader";
import styles from "../styles/Activity.module.scss";


const Nav: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navLinks}>
                <li className={styles.navLink}>
                    All Activity
                </li>
            </ul>
        </nav>
    );
}

const Activity: NextPage = () => {
    return (
        <Base activeLink="activity">
            <div className={styles.main}>
                <Nav />
                <FeedLoader />
            </div>
        </Base>
    );
}

export default Activity;
