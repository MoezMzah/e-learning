import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { addLike, deleteLike, deletePost } from "../../actions/post";

import { Fragment } from "react";
export const PostItem = ({ post, showActions }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${post && post.user}`}>
                    <img className="round-img" src={post && post.avatar} alt="" />
                    <h4>{post && post.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{post && post.text}</p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{post && post.date}</Moment>
                </p>
                {showActions && (
                    <Fragment>
                        <button
                            onClick={() => {
                                dispatch(addLike(post && post._id));
                                post.likes.length = post.likes.length + 1;
                            }}
                            type="button"
                            className="btn btn-light"
                        >
                            <i className="fas fa-thumbs-up"></i>
                            {"  "}
                            {post.likes.length > 0 && <span>{post.likes.length}</span>}
                        </button>
                        <button onClick={() => dispatch(deleteLike(post && post._id))} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${post && post._id}`} class="btn btn-primary">
                            Discussion {post && post.comments.length > 0 && <span class="comment-count">{post && post.comments.length}</span>}
                        </Link>
                        {auth && !auth.loading && post.user === auth.user._id && (
                            <button onClick={() => dispatch(deletePost(post && post._id))} type="button" className="btn btn-danger" id="deletebtn">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};
PostItem.defaultProps = {
    showActions: true,
};
