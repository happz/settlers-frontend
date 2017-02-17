export default function reducer(state, action) {
  switch(action.type) {
    case 'JWT-UPDATE':
      if (state.jwt === action.jwt)
        return state;

      sessionStorage.setItem('JWT', action.jwt);

      return {
        jwt: action.jwt,
        authenticated: true
      };

    case 'JWT-RESET':
      return {
        jwt: null,
        authenticated: false
      };

    default:
      if (!state)
          return {
            jwt: null,
            authenticated: false
          };

      return state;
  }
}

export function updateJWT(jwt) {
  return {
    type: 'JWT-UPDATE',
    jwt: jwt
  };
}

export function resetJWT() {
  return {
    type: 'JWT-RESET'
  };
}
