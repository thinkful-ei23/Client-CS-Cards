import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import ReadMe from './ReadMe'

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h2>Welcome to CS Cards</h2>
            <p>CS cards is a interactive learning app using space repetition that will allow you to quickly and effectively learn many of those hard to grasp Computer Science concepts! Simply create a account and start quizzing yourself.</p>
            <LoginForm />
            <Link to="/register">Register</Link>
            <ReadMe />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
