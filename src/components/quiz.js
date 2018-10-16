import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, sendAnswer} from '../actions/quiz';

export class Quiz extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }
  
  fetchNextQuestion() {
    this.props.dispatch(fetchQuestion());
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
    let answer;
    if (this.props.answer) {
      answer = 
      <div>
        <p>{this.props.answer.answer}</p>
        <button onClick={() => this.fetchNextQuestion()}>Next</button>
      </div>
    }
    else {
      answer = '';
    }
    return (
      <div>
        {answer}
        {question}
        <form onSubmit={(userAnswer) => submitAnswer(userAnswer)}>
          <input id='answer' ref={input => (userAnswer = input)} type='text'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    question: state.quiz.question,
    answer: state.quiz.answer
  };
};

export default connect(mapStateToProps)(Quiz);