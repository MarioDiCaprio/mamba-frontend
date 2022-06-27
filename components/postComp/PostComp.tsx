import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post, User } from "../../graphql/types";
import { RootState } from "../../redux/store";
import convertBinaryProfilePicture from "../../utils/convertBinaryProfilePicture";
import LikeButton from "../buttons/likeButton/LikeButton";
import styles from "./PostComp.module.scss";


const USER_LIKE_POST_GQL = gql`
    mutation UserLikePost($userId: ID, $postId: ID) {
        userLikePost(userId: $userId, postId: $postId) {
            userId
        }
    }
`;

const USER_BY_USERNAME_GQL = gql`
    query UserLikes($username: String) {
        userByUsername(username: $username) {
            userId
            likes {
                postId
            }
        }
    }
`;


function parseDate(date: string): string {
    const tmp = new Date(date);
    const milliseconds = new Date().getTime() - tmp.getTime();
    const elapsed = new Date(milliseconds);
    // if more than a day ago
    if (milliseconds >= 8.64E7) {
        return tmp.toDateString();
    }
    // if less than an hour ago
    if (milliseconds < 3.6E6) {
        return `${elapsed.getMinutes()} minutes ago`;
    }
    // return hours (i.e. between 1 and 23)
    return `${elapsed.getHours()} hours ago`;
}


interface PostCompProps {
    post: Post;
}

const PostComp: React.FC<PostCompProps> = ({ post }) => {
    const username = useSelector((state: RootState) => state.loginCredentials.username);

    const user = useQuery<{ userByUsername: User }, { username?: String }>(
        USER_BY_USERNAME_GQL,
        {
            variables: {
                username: username ?? undefined
            }
        }
    );

    const [userLikePostMutation] = useMutation<{ userLikePost: User }, { userId?: string, postId?: string }>(
        USER_LIKE_POST_GQL,
        {
            variables: {
                userId: user.data?.userByUsername?.userId ?? undefined,
                postId: post.postId
            }
        }
    );

    const [date, setDate] = useState<string>(parseDate(post.dateCreated));

    useEffect(() => {
        const updateDateFromNow = setInterval(() => {
            setDate(parseDate(post.dateCreated));
        }, 60000);
        return () => clearInterval(updateDateFromNow);
    });

    const profilePicture = convertBinaryProfilePicture(post.owner.profilePicture, { className: styles.profilePicture });

    function doesUserLikePost() {
        if (username === null || user.loading || user.error) {
            return false;
        }
        return user.data?.userByUsername.likes.map(post => post.postId).includes(post.postId);
    }

    const likeButton =
        (username === null || user.loading || user.error)?
        <></> : <LikeButton id={`like-btn-${post.postId}`} checked={doesUserLikePost()} onChange={() => userLikePostMutation()} />;

    return (
        <div className={styles.main}>

            {/* Header of post */}
            <div className={styles.header}>
                {/* Left side */}
                <div className={styles.topLeft}>
                    {/* Profile picture */}
                    <div className={styles.profilePictureWrapper}>
                        { profilePicture }
                    </div>

                    {/* Username */}
                    <span className={styles.user}>
                        @{ post.owner.username }
                    </span>
                </div>
                
                {/** Date created */}
                <span className={styles.date}>
                    { date }
                </span>
            </div>
            
            {/** Actual content */}
            <div className={styles.content}>
                {/** Post title */}
                <h3 className={styles.title}>
                    { post.title ?? <></> }
                </h3>
                {/* Post text */}
                <p className={styles.text}>
                    { post.text ?? <></> }
                </p>
            </div>

            {/* bottom container */}
            <div className={styles.bottom}>
                { likeButton }
            </div>
        </div>
    );
}

export default PostComp;
