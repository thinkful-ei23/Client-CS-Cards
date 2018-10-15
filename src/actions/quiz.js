import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
    type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question => ({
    type: FETCH_QUESTION_SUCCESS,
    question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error
});

export const SEND_ANSWER_SUCCESS = 'SEND_ANSWER_SUCCESS';
export const sendAnswerSuccess = res => ({
    type: SEND_ANSWER_SUCCESS,
    res
});

export const fetchQuestion = () => (dispatch, getState) => {
  dispatch(fetchQuestionRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/quiz`, {
      method: 'GET',
      headers: {
          // Provide our auth token as credentials
          Authorization: `Bearer ${authToken}`
      }
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(question => dispatch(fetchQuestionSuccess(question)))
      .catch(err => dispatch(fetchQuestionError(err)))
};
export const sendAnswer = answer => (dispatch, getState) => {
  dispatch(fetchQuestionRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
          // Provide our auth token as credentials
          Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({answer})
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(question => dispatch(sendAnswerSuccess(question)))
      .catch(err => dispatch(fetchQuestionError(err)))
};