import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteComment } from "../../actions/post";
// import { Fragment } from "react";

export const CommentItem = ({ postId, comment }) => {
    // comment: {_id, text, name, avatar, user, date }
    // const dispatch = useDispatch();
    // const auth = useSelector((state) => state.auth);
    return (
        <div className="comment bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${comment.user}`}>
                    <img className="round-img" src={comment.avatar} alt="" />
                    <h6>{comment.name}</h6>
                </Link>
            </div>
            <div>
                <p className="my-1">{comment.text}</p>
                <p className="post-date">
                    Commented on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                </p>
            
                {/* <button onClick={()=> dispatch(deleteComment(postId, comment._id))} type="button"  className="btn btn-danger" id="deletebtn" >
                  <i className="fas fa-times"></i>
                     </button>  */}
            
            {/* { auth && !auth.loading && user && user === auth.user._id && (
                
                    <button onClick={e=> dispatch(deleteComment(postId && _id))} type="button"  className="btn btn-danger"  >
                  <i className="fas fa-times"></i>
                     </button> 
                   
                )} */}
                 </div>
        </div>
    );
};
