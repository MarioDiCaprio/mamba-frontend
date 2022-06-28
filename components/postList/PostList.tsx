import React from "react";
import { Post } from "../../graphql/types";
import PostComp from "../postComp/PostComp";
import styles from "./PostList.module.scss";


interface PostListProps {
    posts?: Post[];
    isLoading?: boolean;
    isError?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts = [], isLoading = false, isError = false }) => {
    if (isError) {
        return (
            <div className={styles.main}>
                <h1 className={styles.errorMessage}>Error loading data!</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.main}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        );
    }

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
