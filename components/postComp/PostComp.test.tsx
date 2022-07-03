import { mount } from "cypress/react";
import { SERVER_URL } from "../../variables";
import { hasOperationName } from "../../graphql/cypressTestUtils";
import { Post, User } from "../../graphql/types";
import { Providers } from "../../pages/_app";
import PostComp from "./PostComp";


const user = {
    userId: 'UserId',
    username: 'User',
    profilePicture: null
} as User;

const textPost = {
    postId: 'PostId',
    title: 'Hello, World!',
    text: 'This is a textual post.',
    dateCreated: '1000',
    owner: user,
    type: 'TEXT'
} as Post;

describe('<PostComp>', () => {

    beforeEach(() => {
        cy.intercept('POST', SERVER_URL, req => {
            if (hasOperationName(req, 'UserLikes')) {
                req.alias = 'gqlUserLikesQuery';
                req.reply(res => {
                    res.body.data.userByUsername = user;
                });
            }
            if (hasOperationName(req, 'UserLikePost')) {
                req.alias = 'gqlUserLikePostMutation';
                req.reply(res => {
                    res.body.data.userLikePost = user;
                });
            }
        });
    });

    it('should render text post', () => {
        mount(
            <Providers>
                <PostComp post={textPost} />
            </Providers>
        );
        cy.get(`[data-test="title"]`).contains('Hello, World!');
        cy.get(`[data-test="text"]`).contains('This is a textual post.');
        cy.get(`[data-test="username"]`).contains('@User');
        cy.get(`[data-test="date"]`).contains('Wed Jan 01 1000');
    });

});
