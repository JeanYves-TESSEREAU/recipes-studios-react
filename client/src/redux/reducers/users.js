import { GET_USERS, USER_UPDATED } from '../constants/actionTypes';
/**
 *
 * @type {{users: *[]}}
 */
const initialState = {
  users: [],
};

export default function users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case USER_UPDATED:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    default:
      return state;
  }
}
