import { NextPage } from "next";
import Base from "../components/base/Base";
import LikedPostsLoader from "../components/_likes/likedPostsLoader/LikedPostsLoader";


const Likes: NextPage = () => {
    return (
        <Base activeLink="likes">
            <LikedPostsLoader />
        </Base>
    );
}

export default Likes;
