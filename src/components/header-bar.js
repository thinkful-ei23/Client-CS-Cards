import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <div className='welcome-logout-container'>
                    <p className='welcome-username'>Welcome, {this.props.currentUser.username}</p>
                    <button className='button-logout' onClick={() => this.logOut()}>Log out</button>
                </div>
            );
        }
        console.log(this.props.loggedIn)
        return (
            <div className="header-bar">
                <h1>CS Cards</h1>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loggedIn: state.auth.currentUser !== null,
        currentUser: state.auth.currentUser
    }
};

export default connect(mapStateToProps)(HeaderBar);
