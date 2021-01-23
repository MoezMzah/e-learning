import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/profile";
import { Link } from "react-router-dom";

const ProfileAbout = ({ profile, deleteAccount }) => {
    let name = profile && profile.user && profile.user.name;
    let bio = profile && profile.bio;

    return (
        <div className="profile-about">
            {bio && (
                <Fragment>
                    <h2 className="bio">{name.trim().split(" ")[0]}'s Bio</h2>
                    <p className="biobody">{bio}</p>{" "}
                </Fragment>
            )}
            <div className="line"></div>
            <h2 className="bio">Skill Set</h2>
            <div className="skills">
                <ul>
                    {profile &&
                        profile.skills &&
                        profile.skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="profile-card-inf__txt">
                                {skill}
                            </li>
                        ))}
                </ul>
                {profile !== null ? (
                    <>
                        {" "}
                        <Fragment>
                            {" "}
                            <Link to="/edit-profile" className="btn btn-primary">
                                {" "}
                                <i className="fas fa-user-edit"></i>{" "}
                            </Link>
                        </Fragment>
                        <Fragment>
                            <div className="my-2">
                                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i>
                                </button>
                            </div>
                        </Fragment>
                    </>
                ) : (
                    <Fragment>
                        {" "}
                        <p className="small">You have not yet set a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary">
                            {" "}
                            Create profile{" "}
                        </Link>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default connect(null, { deleteAccount })(ProfileAbout);
