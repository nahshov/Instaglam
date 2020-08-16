import {
  SET_POST

} from 'actions/post/postTypes';

const initialState = {
  post: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POST:
      return {
        ...state,
        post: payload
      };
    default:
      return state;
  }
}