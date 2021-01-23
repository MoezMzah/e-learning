import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { CreateProfil } from "../../actions/profile";

export const CreateProfile = ({ history }) => {
    const [formData, setFormData] = useState({
        location: "",
        status: "",
        bio: "",
        skills: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const { location, status, bio, skills, facebook, twitter, instagram } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateProfil(formData, history));
    };
    return (
        <Fragment>
            <form id="msform">
                <ul id="progressbar">
                    <li class="active">Required Fields</li>
                    <li>Social Profiles</li>
                    <li>Personal Details</li>
                </ul>

                <fieldset>
                    <h2 className="fs-title">Create your account</h2>
                    <h3 className="fs-subtitle">This is step 1</h3>
                    <select value={status} onChange={handleChange} name="status">
                        <option value="0">* Select Professional Status</option>
                        <option value="Professor">Professor</option>
                        <option value="Student">Student</option>
                    </select>
                    <input type="text" value={skills} onChange={handleChange} name="skills" placeholder="* Skills" />
                    <input type="button" name="next" class="next action-button" value="Next" />
                </fieldset>
                <fieldset>
                    <h2 className="fs-title">Social Profiles</h2>
                    <h3 className="fs-subtitle">Your presence on the social network</h3>
                    <input type="text" value={facebook} onChange={handleChange} class="form-control" name="facebook" placeholder="Facebook URL" />
                    <input type="text" value={instagram} onChange={handleChange} class="form-control" name="instagram" placeholder="Instagram URL" />
                    <input type="text" value={twitter} onChange={handleChange} class="form-control" name="twitter" placeholder="Twitter URL" />
                    <input type="button" name="next" class="next action-button" value="Next" />
                </fieldset>
                <fieldset>
                    <h2 className="fs-title">Personal Details</h2>
                    <h3 className="fs-subtitle">We will never sell it</h3>
                    <input type="text" onChange={handleChange} name="location" value={location} placeholder="Location" />
                    <textarea name="bio" value={bio} onChange={handleChange} placeholder="A short bio of yourself" />
                    <button onClick={handleSubmit} type="submit" class="submit action-button">
                        Submit
                    </button>

                    <button>
                        <Link className="btn btn-light my-1" to="/dashboard">
                            Go Back
                        </Link>
                    </button>
                </fieldset>
            </form>
        </Fragment>
    );
};

export default withRouter(CreateProfile);
