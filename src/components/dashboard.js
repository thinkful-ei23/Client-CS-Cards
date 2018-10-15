import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Quiz from './quiz';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onQuiz: false,
            quizButton: 'Start'
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    toggleOnQuiz() {
        this.setState({
            onQuiz: !this.state.onQuiz,
            quizButton: (this.state.quizButton === 'Stop' ? 'Start' : 'Stop')
        });
    }
    render() {
        let quizArea;
        if (!this.state.onQuiz) {
            quizArea = '';
        } else {
            quizArea = <Quiz />
        }
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <button type='button' onClick={() => this.toggleOnQuiz()}>{this.state.quizButton} Quiz</button>
                {quizArea}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
