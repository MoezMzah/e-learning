import { React, useEffect } from "react";
import { getPosts } from "../../actions/post";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { PostItem } from "./PostItem";
import { PostForm } from "./PostForm";
const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    useEffect(() => {
        dispatch(getPosts());
    });
    return (
        <Fragment>
            <h1 className="lead">
                <i className="fas fa-user"></i>welcome to the community{" "}
            </h1>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
};
export default Posts;
