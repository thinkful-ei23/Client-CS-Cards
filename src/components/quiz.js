import React from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/quiz';

export class Quiz extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
}
  render() {
    let question;
    if(this.props.question) {
      // question = this.props.question;
    }
    return (
      <div>
        {question}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    question: state.quiz.question
  };
};

export default connect(mapStateToProps)(Quiz);