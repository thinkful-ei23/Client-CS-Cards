import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import ReadMe from './ReadMe'
import LoginForm from './login-form';
import DemoAccount from './demoAccount';
import './landing-page.css'

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h2 className='landing-h2'>Welcome to CS Cards</h2>
            <LoginForm />
            <Link to="/register">Register</Link>
            <DemoAccount />
            <ReadMe />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
