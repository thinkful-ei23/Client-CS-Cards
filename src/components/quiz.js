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
    let questionFontSize;
    if (this.props.question) {
      if (this.props.question.length < 220 &&       this.props.question.length > 170) {
        questionFontSize = 'question-text-high';
      } else if (this.props.question.length < 170) {
        questionFontSize = 'question-text-low';
      } else {
        questionFontSize = '';
      }
    }
    if (this.props.answer) {
      return (
      <div className='quiz'>
        <p className={`answer ${answers}`}>{this.props.answer.answer}</p>
        <p className='answer-text'><span className="correct-answer">{this.props.answer.correctAnswer}</span> : {this.props.question}</p>
        <button className='next-button' onClick={() => this.fetchNextQuestion()}>Next</button>
      </div>
      );
    } else {
      return (
        <div className='quiz'>
          <p className={`quiz-question ${questionFontSize}`}>{question}</p>
          <form className='quiz-form' onSubmit={(userAnswer) => submitAnswer(userAnswer)}>
            <input id='answer' className='quiz-input' ref={input => (userAnswer = input)} type='text'></input>
            <button className='quiz-button-submit' type='submit'>Submit</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    question: state.quiz.question,
    answer: state.quiz.answer
  };
};

export default requiresLogin()(connect(mapStateToProps)(Quiz));