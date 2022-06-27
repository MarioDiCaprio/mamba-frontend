export interface User {
    userId: string;
    userVersion: number;
    username: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    description: string | null;
    profilePicture: number[] | null;
    followers: User[];
    following: User[];
    posts: Post[];
    likes: Post[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Post {
    postId: string;
    postVersion: number;
    dateCreated: string;
    dateUpdated: string;
    title: string | null;
    text: string | null;
    media: number[] | null;
    owner: User;
    likes: Post[];
    reposts: Post;
    repostedBy: Post[];
    tags: Tag[];
    type: PostType;
}

export type PostType = ('TEXT' | 'PICTURE' | 'VIDEO' | 'COMMENT' | 'REPOST');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

 export interface Tag {
    tagId: string;
    tagVersion: number;
    name: string;
    posts: string[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface RegisterRequest {
    username: string | null;
    email: string | null;
    password: string | null;
}

export interface RegisterResponse {
    username: string | null;
    email: string | null;
    password: string | null;
    valid: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface LoginRequest {
    username: string | null;
    password: string | null;
}

export interface LoginResponse {
    username: string | null;
    password: string | null;
    valid: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Mutation {
    // login
    login: LoginResponse;
    // registration
    register: RegisterResponse;
    // Post
    createPost: Post;
}

export interface Query {
    // User
    userAll: User[];
    userById: User;
    userByUsername: User;
    // Post
    postAll: Post[];
    postById: Post;
    postsByTitle: Post[];
}
