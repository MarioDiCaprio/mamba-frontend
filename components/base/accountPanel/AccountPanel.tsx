import React from "react";
import { User } from "../../../graphql/types";
import convertBinaryProfilePicture from "../../../utils/convertBinaryProfilePicture";
import styles from "./AccountPanel.module.scss";


/**
 * Props for the `<AccountPanel>` component.
 * @see {@link AccountPanel}
 */
interface AccountPanelProps {
    /** The user to be displayed on the panel */
    user: User;
}


/**
 * This is the account panel for the `Base`'s sidebar, which is
 * rendered when the user is logged in. It contains the user's username,
 * their profile picture and the number of followers and following users.
 * @returns The account panel
 * @see {@link AccountPanelProps}
 */
const AccountPanel: React.FC<AccountPanelProps> = ({ user }) => {
    // user's profile picture
    const profilePicture = convertBinaryProfilePicture(user.profilePicture, { className: styles.profilePicture });

    return (
        <div className={styles.accountPanel}>
            {/* Profile picture */}
            { profilePicture }
            {/* Username */}
            <span data-test="username">{ user.username }</span>
            {/* Horizontal separator */}
            <hr className={styles.hr} />
            {/* Followers and Following (wrapper) */}
            <div className={styles.followersAndFollowing}>
                {/* Followers */}
                <div>
                    <span>Followers</span>
                    <span data-test="followers">
                        { user.followers.length }
                    </span>
                </div>
                {/* Following */}
                <div>
                    <span>Following</span>
                    <span data-test="following">
                        { user.following.length }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AccountPanel;
