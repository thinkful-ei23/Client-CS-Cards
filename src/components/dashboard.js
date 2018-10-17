import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchStats} from '../actions/stats';
import Quiz from './quiz';

import './dashboard.css' 

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onQuiz: false,
            quizButton: 'Start'
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchStats());
    }
    toggleOnQuiz() {
        this.setState({
            onQuiz: !this.state.onQuiz,
            quizButton: (this.state.quizButton === 'Stop' ? 'Start' : 'Stop')
        });
    }
    render() {
        console.log(this.props.stats)
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
                <div className='stats-container'>
                <p>Total Questions Answered: {this.props.stats ? this.props.stats.totalQuestions : 0}</p>
                <p>Lifetime {(this.props.stats && this.props.stats.totalQuestions !== 0) ? Math.floor(this.props.stats.totalRight/this.props.stats.totalQuestions * 100): 0}% Answered Correctly</p>
                <p>{this.props.stats ? this.props.stats.recurringCorrect : 0 } Correct Questions In a Row!</p>
                </div>

                <button type='button' className='button-toggle-quiz'onClick={() => this.toggleOnQuiz()}>{this.state.quizButton} Quiz</button>
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
        
        stats: state.stats.stats
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
