import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Post } from "../../../graphql/types";
import PostList from "../../postList/PostList";


/**
 * GraphQL request to fetch feed.
 */
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


/**
 * This component loads the public feed. The queried posts are displayed with the {@link PostList} component.
 * @returns The component
 */
const FeedLoader: React.FC = () => {
    // TODO add pagination
    const [page, setPage] = useState<number>(1);
    const { data, error, loading } = useQuery<{ postAll: Post[] }, { page: number }>(LOAD_FEED_GQL, {
        variables: { page }
    });

    return (
        <PostList posts={data?.postAll} isLoading={loading} isError={error !== undefined} />
    );
}

export default FeedLoader;
