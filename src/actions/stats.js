import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const fetchStatsRequest = () => ({
    type: FETCH_STATS_REQUEST
});

export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const fetchStatsSuccess = stats => ({
    type: FETCH_STATS_SUCCESS,
    stats
});

export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';
export const fetchStatsError = error => ({
    type: FETCH_STATS_ERROR,
    error
});

export const fetchStats = () => (dispatch, getState) => {
  dispatch(fetchStatsRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      headers: {
          // Provide our auth token as credentials
          Authorization: `Bearer ${authToken}`
      }
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({stats}) => dispatch(fetchStatsSuccess(stats)))
      .catch(err => {
          dispatch(fetchStatsError(err));
      });
};