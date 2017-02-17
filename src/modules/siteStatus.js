export default function reducer(state, action) {
  switch(action.type) {
    case 'SITE-STATUS-UPDATE':
      if (state === action.status)
        return state;

      return action.status;

    default:
      if (!state)
        return 'online';

      return state;
  }
};

export function updateSiteStatus(status) {
  return {
    type: 'SITE-STATUS-UPDATE',
    status: status
  }
}
