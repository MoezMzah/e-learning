import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/spinner";
import { Fragment } from "react";

import { Link } from "react-router-dom";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    let _id = profile && profile.user && profile.user._id;
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <div className="DashCont">
            <h1>
                <i className="fas fa-user"></i> Welcome <strong>{user && user.name}</strong>
            </h1>
            {profile !== null ? (
                <>
                    {" "}
                    <Link to={`/profile/${_id}`}>
                        <span>View Profile</span>
                    </Link>
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
    );
};
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});
export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(Dashboard);
