import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, sendAnswer} from '../actions/quiz';
import { fetchStats } from '../actions/stats';

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
    if (this.props.answer) {
      return (
      <div>
        <p>{this.props.answer.answer}</p>
        <p>{this.props.answer.correctAnswer} : {this.props.question}</p>
        <button onClick={() => this.fetchNextQuestion()}>Next</button>
      </div>
      );
    } else {
      return (
        <div className='quiz'>
          {question}
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

export default connect(mapStateToProps)(Quiz);