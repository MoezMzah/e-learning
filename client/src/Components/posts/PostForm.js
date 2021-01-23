import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/post";
export const PostForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const formData={}
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost({ ...formData, text }));
        setText("");
    };
    return (
        <div className="post-form">
            <form className="form my-1">
                <input className="postinput" name="text" onChange={handleChange} placeholder="Say Something..." required value={text}></input>
                <input onClick={handleSubmit} type="submit" className="btn btn-dark my-1" value="Publish" />
            </form>
        </div>
    );
};
