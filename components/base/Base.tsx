import React from "react";
import LoginPanel from "./loginPanel/LoginPanel";
import AccountPanel from "./accountPanel/AccountPanel";
import LinksPanel, { LinksPanelProps } from "./linksPanel/LinksPanel";
import LoadingPanel from "./loadingPanel/LoadingPanel";
import Topbar from "./topbar/Topbar";
import CreatePostPanel from "./createPostPanel/CreatePostPanel";
import styles from "./Base.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { gql, useQuery } from "@apollo/client";
import { User } from "../../graphql/types";


const USER_BY_USERNAME_GQL = gql`
    query UserByUsername($username: String) {
        userByUsername(username: $username) {
            userId
            username
            followers { userId }
            following { userId }
            profilePicture
        }
    }
`;


interface LoginOrAccountPanelProps {
    userGQL: any;
}

/**
 * This panel returns either a login panel, an account panel
 * or a loading panel based on the user's login status. This
 * panel is only visible on large screens.
 * @returns A corresponding panel
 * @see {@link useFullDataIfLoggedIn}, {@link LoadingPanel}, {@link LoginPanel}, {@link AccountPanel}
 */
const LoginOrAccountPanel: React.FC<LoginOrAccountPanelProps> = ({ userGQL }) => {
    const { loading, error, data } = userGQL;

    if (loading) {
        return <LoadingPanel />;
    }
    // if user not logged in: return login panel
    if (data?.userByUsername === null || error) {
        return <LoginPanel />;
    }
    // if user is logged in: return account panel
    return <AccountPanel user={data?.userByUsername as User} />;
}


/**
 * This is the sidebar. It contains the title, the login (or account)
 * panel and links to other pages. This component is responsive and is
 * rendered differently on large-, medium- and small-sized screens.
 * @param props The props for the sidebar
 * @returns The sidebar component
 * @see {@link LinksPanel}, {@link LinksPanelProps}, {@link LoginOrAccountPanel}
 */
const Sidebar: React.FC<LinksPanelProps & LoginOrAccountPanelProps> = (props) => {
    return (
        <div className={styles.sidebar}>
            {/* Box 1 */}
            <div className={styles.sidebarBox1}>
                {/* Logo (large screens only) */}
                <img src="/logo/logo-full.png" className={styles.sidebarLogo} />
                {/* Logo (medium screens only) */}
                <img src="/logo/logo-icon.png" className={styles.sidebarLogoSmall} />
                {/* Login- or Account Panel (large screens only) */}
                <div className={styles.loginOrAccountPanel}>
                    <LoginOrAccountPanel userGQL={props.userGQL} />
                </div>
            </div>
            {/* Box 2 */}
            <div className={styles.sidebarBox2}>
                <LinksPanel activeLink={props.activeLink} />
            </div>
        </div>
    );
}


/**
 * The props for the `<Base />` component.
 * @see {@link Base}
 */
interface BaseProps {
    /**
     * The children of this node. These are rendered inside
     * of the main panel in the center.
     * */
    children?: React.ReactNode;
}

/**
 * This is the main component. It renders a sidebar, a topbar, a members-panel and
 * the actual content. This component is also very responsive and renders differently
 * on large-, medium- and small-sized screens. This component is intended to be a
 * template for most other pages.
 * @param props The component's props
 * @returns The base component
 * @see {@link BaseProps}, {@link LinksPanelProps}
 */
const Base: React.FC<BaseProps & LinksPanelProps> = (props) => {
    /** Username logged in with (`null` if not logged in) */
    const username = useSelector((state: RootState) => state.loginCredentials.username);

    /** Fetched user data based on username logged in with */
    const user = useQuery<{ userByUsername: User }, { username: String | null }>(USER_BY_USERNAME_GQL, {
        variables: { username }
    });

    return (
        <div className={styles.main}>

            {/* The sidebar */}
            <Sidebar userGQL={user} activeLink={props.activeLink} />

            {/* Container for everything else */}
            <div className={styles.container}>

                {/* The topbar */}
                <Topbar user={user.data?.userByUsername} />

                {/* A wrapper for the content- and members panel */}
                <div className={styles.contextWrapper}>

                    {/* The actual content */}
                    <div className={styles.context}>
                        <CreatePostPanel user={user.data?.userByUsername} />
                        { props.children }
                    </div>
                    
                    {/* The members panel */}
                    <div className={styles.members}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Base;
