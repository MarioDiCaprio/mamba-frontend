import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Post } from "../../../graphql/types";
import PostComp from "../../postComp/PostComp";
import PostList from "../../postList/PostList";
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

    return (
        <PostList posts={data?.postAll} isLoading={loading} isError={error !== undefined} />
    );
}

export default FeedLoader;
