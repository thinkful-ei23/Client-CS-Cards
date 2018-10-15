import {
  FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR, SEND_ANSWER_SUCCESS
} from '../actions/quiz';

const initialState = {
  question: null,
  answer: null,
  loading: false,
  error: null
};

export default function quizReducer(state = initialState, action) {
  if (action.type === FETCH_QUESTION_REQUEST) {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
  } else if (action.type === FETCH_QUESTION_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        question: action.question
      });
  } else if (action.type === FETCH_QUESTION_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }else if (action.type === SEND_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      answer: action.res
      });
}
  return state;
}
