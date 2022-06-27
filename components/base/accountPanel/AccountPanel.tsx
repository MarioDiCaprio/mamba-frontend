import React from "react";
import { User } from "../../../graphql/types";
import convertBinaryProfilePicture from "../../../utils/convertBinaryProfilePicture";
import styles from "./AccountPanel.module.scss";


interface AccountPanelProps {
    user: User;
}

/**
 * This is the account panel for the `Base`'s sidebar, which is
 * rendered when the user is logged in. It contains the user's username,
 * their profile picture and the number of followers and following users.
 * @returns The account panel
 */
const AccountPanel: React.FC<AccountPanelProps> = ({ user }) => {
    // user's profile picture
    const profilePicture = convertBinaryProfilePicture(user.profilePicture, { className: styles.profilePicture });

    return (
        <div className={styles.accountPanel}>
            {/* Profile picture, or nothing if still being fetched */}
            { profilePicture ?? <></> }
            {/* Username */}
            <span>{ user.username }</span>
            {/* Horizontal separator */}
            <hr className={styles.hr} />
            {/* Followers and Following */}
            <div className={styles.followersAndFollowing}>
                {/* Followers */}
                <div>
                    <span>Followers</span>
                    <span>{user.followers.length ?? 0}</span>
                </div>
                {/* Following */}
                <div>
                    <span>Following</span>
                    <span>{user.following.length ?? 0}</span>
                </div>
            </div>
        </div>
    );
}

export default AccountPanel;
