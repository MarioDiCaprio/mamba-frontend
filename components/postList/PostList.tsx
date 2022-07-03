import React from "react";
import { Post } from "../../graphql/types";
import PostComp from "../postComp/PostComp";
import styles from "./PostList.module.scss";


/**
 * The props for the {@link PostList} component.
 */
interface PostListProps {
    posts?: Post[];
    isLoading?: boolean;
    isError?: boolean;
}


/**
 * This component renders a list of posts. each post is mapped to a {@link PostComp}, which is then
 * laid out into a container.
 * @param param0 The props for the component
 * @returns The component
 * @see {@link Post}
 */
const PostList: React.FC<PostListProps> = ({ posts = [], isLoading = false, isError = false }) => {
    // if error: return error screen
    if (isError) {
        return (
            <div className={styles.postList}>
                <h1 className={styles.errorMessage}>Error loading data!</h1>
            </div>
        );
    }

    // if loading: return loading screen
    if (isLoading) {
        return (
            <div className={styles.postList}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        );
    }

    // map each post to an appropriate component
    const list = posts.map(post => (
        <div className={styles.postWrapper} key={`post-wrapper-${post.postId}`}>
            <PostComp post={post} />
        </div>
    ));

    return (
        <div className={styles.postList}>
            { list }
        </div>
    );
}

export default PostList;
