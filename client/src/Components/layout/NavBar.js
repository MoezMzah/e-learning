import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./test.css";
import logo from "../../assets/wl 1.png";
    const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const profile = useSelector((state) => state.profile.profile);
    const stat = profile && profile.status;
    const authLinks =
        stat && profile.status === "Professor" ? (
            <header>
                <img className="logo" src={logo} alt="" />
                <nav>
                    <ul className="nav-area">
                        <li>
                            {" "}
                            <a href="/dashboard">Dashboard </a>{" "}
                        </li>
                        <li>
                            {" "}
                            <a href="/list">Courses</a>
                        </li>
                        <li>
                            {" "}
                            <a href="/upload">Upload Courses</a>
                        </li>
                        <li>
                            {" "}
                            <a href="/profiles">Profiles</a>
                        </li>
                        <li>
                            {" "}
                            <a href="/posts">Posts</a>
                        </li>
                        <li>
                            <a onClick={logout} href="/login">
                                Log Out{" "}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        ) : (
            <header>


                <img className="logo" src={logo} alt="" />
                <nav>
                    <ul className="nav-area">
                        <li>
                            {" "}
                            <a href="/dashboard">Dashboard </a>{" "}
                        </li>
                        <li>
                            {" "}
                            <a href="/list">Courses</a>
                        </li>


                        <li>
                            {" "}
                            <a href="/profiles">Profiles</a>
                        </li>
                        <li>
                            {" "}
                            <a href="/posts">Posts</a>
                        </li>

                        <li>
                            <a onClick={logout} href="/login">
                                Log Out{" "}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    const guestLinks = <Link to="/"></Link>;
    return <div>{!loading && <Fragment className="bar">{isAuthenticated ? authLinks : guestLinks}</Fragment>}</div>;
};
NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);
