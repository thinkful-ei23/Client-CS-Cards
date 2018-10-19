import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, sendAnswer} from '../actions/quiz';
import { fetchStats } from '../actions/stats';
import requiresLogin from './requires-login';

import './quiz.css';

export class Quiz extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }
  
  fetchNextQuestion() {
    this.props.dispatch(fetchQuestion());
    this.props.dispatch(fetchStats());
  }

  render() {
    let question;
    if(this.props.question) {
      question = this.props.question;
    }
    let userAnswer;
    const submitAnswer = (value) => {
      value.preventDefault();
      this.props.dispatch(sendAnswer(userAnswer.value));
    }
    let answers
    if(this.props.answer != null && this.props.answer.answer === 'correct'){
      answers = 'correct-answer';
    }else{
      answers = 'incorrect-answer';
    }
    let error;
    if (this.props.error) {
      error = this.props.error.message;
    }
    if (this.props.answer) {
      return (
      <div className='quiz' aria-live = 'polite'>
        <p className={answers}>{this.props.answer.answer}</p>
        <p><span className="correct-answer">{this.props.answer.correctAnswer}</span> : {this.props.question}</p>
        <button className='next-button' onClick={() => this.fetchNextQuestion()}>Next</button>
      </div>
      );
    } else {
      return (
        <div className='quiz' aria-live = 'polite'>
          <p className='quiz-question'>{question}</p>
            <form className='quiz-form' onSubmit={(userAnswer) => submitAnswer(userAnswer)}>
            <input id='answer' className='quiz-input' ref={input => (userAnswer = input)} type='text'></input>
            <button className='quiz-button-submit' type='submit'>Submit</button>
            <div className='quiz-submit-error'>{error}</div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    question: state.quiz.question,
    answer: state.quiz.answer,
    error: state.quiz.error
  };
};

export default requiresLogin()(connect(mapStateToProps)(Quiz));