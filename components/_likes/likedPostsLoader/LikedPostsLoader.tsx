import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "../../../graphql/types";
import { RootState } from "../../../redux/store";
import PostComp from "../../postComp/PostComp";
import styles from "./LikedPostsLoader.module.scss";


const USER_BY_USERNAME_GQL = gql`
    query LikedPosts($username: String) {
        userByUsername(username: $username) {
            likes {
                postId
                title
                text
                media
                type
                dateCreated
                dateUpdated
                owner {
                    profilePicture
                    username
                }
            }
        }
    }
`;


const LikedPostsLoader: React.FC = () => {
    const username = useSelector((state: RootState) => state.loginCredentials.username);

    const user = useQuery<{ userByUsername: User }, { username?: string }>(
        USER_BY_USERNAME_GQL,
        {
            variables: {
                username: username ?? undefined
            }
        }
    );

    if (user.loading || user.data === undefined) {
        return (
            <div className={styles.main}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        );
    }

    if (user.error) {
        return (
            <div className={styles.main}>
                <h1 className={styles.errorMessage}>
                    Error fetching data!
                </h1>
            </div>
        );
    }

    const posts = user.data.userByUsername.likes.map(post => <PostComp post={post} key={post.postId} />);

    return (
        <div className={styles.main}>
            { posts }
        </div>
    );
};

export default LikedPostsLoader;
