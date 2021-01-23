import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
function Landing({ isAuthenticated }) {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div>
            <div className="first">
                <h1>
                    Learn
                    <br /> With Us
                </h1>
                <p> We are an E-learning platfrom designed for both professors and students to learn safely from home </p>
            </div>

            <div className="first">
                <h2>About</h2>
                <h5>E-learn was founded by students to students to help create a safe enviroment for learning through covid-19 pandemic</h5>
            </div>
        </div>
    );
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
