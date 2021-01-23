import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/spinner";
import { Link } from "react-router-dom";
import { getProfilById } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
export const Profile = ({ match }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.profile.loading);
    const profile = useSelector((state) => state.profile.profile);
    useEffect(() => {
        dispatch(getProfilById(match.params.id));
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Fragment>
            <Fragment>
                {profile === null || loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        {" "}
                        <Link to="/profiles" className="btn btn-light">
                            <i className="fas fa-arrow-left"></i> Back To Profiles
                        </Link>{" "}
                    </Fragment>
                )}
            </Fragment>
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
            </div>
        </Fragment>
    );
};
