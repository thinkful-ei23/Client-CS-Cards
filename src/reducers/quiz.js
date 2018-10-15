import {
  FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR
} from '../actions/quiz';

const initialState = {
  question: null,
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
  }
  return state;
}
