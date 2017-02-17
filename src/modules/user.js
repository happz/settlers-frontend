export default function reducer(state, action) {
  switch(action.type) {
    case 'USER-UPDATE':
      return action.user;

    default:
      if (!state)
        return null;

      return state;
  }
}

export function updateUser(user) {
  return {
    type: 'USER-UPDATE',
    user: user
  }
}
