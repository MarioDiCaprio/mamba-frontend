import React from "react";
import { MdOutlineCollectionsBookmark as ActivityIcon } from 'react-icons/md';
import { BsHeartFill as LikesIcon } from 'react-icons/bs';
import styles from "./LinksPanel.module.scss";
import { useRouter } from "next/router";


/**
 * The props for the {@link LinksPanel} component.
 */
export interface LinksPanelProps {
    /** The panel's active link. Should indicate the current page. */
    activeLink?: 'activity' | 'likes';
}

/**
 * This is the sidebar's links panel. It contains all useful links
 * to other pages. The active link is highlighted, while the other ones
 * are not. This panel is responsive and renders differently on large-
 * and medium-sized screens.
 * @param props The props for this component
 * @returns The links panel
 * @see {@link LinksPanelProps}
 */
const LinksPanel: React.FC<LinksPanelProps> = (props) => {
    const router = useRouter();

    function linkStyle(link: typeof props.activeLink): string | undefined {
        if (link === props.activeLink)
            return [styles.panelLink, styles.panelLinkActive].join(' ');
        return styles.panelLink;
    }
    return (
        <div className={styles.linksPanel}>
            {/* Activity */}
            <div className={linkStyle('activity')} data-test="activity">
                <ActivityIcon onClick={() => router.push('/activity')} data-test="activity-icon"/>
                <span>Activity</span>
            </div>
            {/* Likes */}
            <div className={linkStyle('likes')} data-test="likes">
                <LikesIcon onClick={() => router.push('/likes')} data-test="likes-icon"/>
                <span>Likes</span>
            </div>
        </div>
    );
}

export default LinksPanel;
