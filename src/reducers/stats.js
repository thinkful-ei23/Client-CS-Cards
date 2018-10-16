import {
  FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_ERROR
} from '../actions/stats';

const initialState = {
  stats: null,
  loading: false,
  error: null
};

export default function statsReducer(state = initialState, action) {
  if (action.type === FETCH_STATS_REQUEST) {
      return Object.assign({}, state, {
        loading: true,
        error: null,
        answer: null
      });
  } else if (action.type === FETCH_STATS_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        stats: action.stats
      });
  } else if (action.type === FETCH_STATS_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
}
  return state;
}
