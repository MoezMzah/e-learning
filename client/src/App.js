import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import Nav from "./Components/layout/NavBar";
import Landing1 from "./Components/auth/auth";
import Alert from "./Components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utiles/setAuthToken";
import Dashboard from "./Components/dashboard/Dashboard";
import CreateProfile from "./Components/profile-form/Create";
import EditProfile from "./Components/profile-form/EditProfile";
import Profiles from "./Components/profiles/Profiles";
import { Profile } from "./Components/profile/Profile";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import FileUpload from "./Components/Uploadfiles/FileUpload";
import FilesList from "./Components/Uploadfiles/FileList";
import Posts from "./Components/posts/Posts";
import Post from "./Components/post/Post";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider className="App" store={store}>
            <Router>
                <Fragment>
                    <Nav />
                    <Route exact path="/login" component={Landing1} />

                    <section className="Container">
                        <Alert />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/posts" component={Posts} />
                            <PrivateRoute exact path="/profiles" component={Profiles} />
                            <PrivateRoute exact path="/profile/:id" component={Profile} />
                            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                            <Route exact path="/edit-profile" component={EditProfile} />
                            <PrivateRoute exact path="/post/:id" component={Post} />
                            <PrivateRoute component={FileUpload} path="/upload" />
                            <PrivateRoute component={FilesList} path="/list" />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
