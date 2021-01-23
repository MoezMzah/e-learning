import { React, useEffect } from "react";
import { getProfiles } from "../../actions/profile";
import { connect, useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import "./prof.scss";
export const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    const loading = useSelector((state) => state.profile.loading);
    useEffect(() => {
        dispatch(getProfiles());
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="container">
            <Fragment>
                {loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        <div className="profiles">{profiles.length > 0 ? profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />) : <h4> no profiles found </h4>}</div>
                    </Fragment>
                )}
            </Fragment>
        </div>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
