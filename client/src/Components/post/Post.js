import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../actions/post";
import { Link } from "react-router-dom";
import { PostItem } from "../posts/PostItem";
import { CommentForm } from "../post/CommentForm";
import { CommentItem } from "../post/CommentItem";
const Post = ({ match }) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post.post);
    useEffect(() => {
        dispatch(getPost(match.params.id));
    },[]);

    return (
        <Fragment>
            <Link to="/posts" className="btn">
                {" "}
                Back To Posts
            </Link>{" "}
            <PostItem post={post} showActions={false} />
            <div className="comments">{post && post.comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}</div>
            <CommentForm postId={post && post._id} />
        </Fragment>
    );
};
export default Post;
