import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Post } from "../../../graphql/types";
import PostComp from "../../postComp/PostComp";
import styles from "./FeedLoader.module.scss";


const LOAD_FEED_GQL = gql`
    query LoadFeed($page: Int) {
        postAll(page: $page) {
            postId
            title
            text
            media
            dateCreated
            dateUpdated
            type
            owner {
                username
            }
        }
    }
`;


const FeedLoader: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { data, error, loading } = useQuery<{ postAll: Post[] }, { page: number }>(LOAD_FEED_GQL, {
        variables: { page }
    });

    if (loading) {
        return (
            <div className={styles.main}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className={styles.main}>
                <h1 className={styles.errorMessage}>Error loading data!</h1>
            </div>
        );
    }

    const renderedFeed = data?.postAll.map(post => <PostComp post={post} key={post.postId} />);

    return (
        <div className={styles.main}>
            { renderedFeed }
        </div>
    );
}

export default FeedLoader;
