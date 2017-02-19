import { PropTypes } from 'react';

const siteStatusValues = PropTypes.oneOf(['online', 'maintenance', 'offline']);

const fieldValidStates = PropTypes.oneOf(['valid', 'invalid', 'unknown']);

const gamesListProp = PropTypes.oneOf(['', 'settlers']);

const currentUserPropShape = {
  afterPassTurn: PropTypes.number.isRequired,
  colors: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  sound: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

const commonUserPropShape = {
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired
};

const playersPropShape = {
  user: PropTypes.shape(commonUserPropShape).isRequired,
  color: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isOnTurn: PropTypes.bool.isRequired,
  isMyPlayer: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};

const gamePropShape = {
  id: PropTypes.number.isRequired,
  kind: PropTypes.oneOf(['settlers']).isRequired,
  name: PropTypes.string.isRequired,
  round: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape(playersPropShape)).isRequired,
  forhont: PropTypes.shape(playersPropShape).isRequired,
  isPresent: PropTypes.bool.isRequired,
  isInvited: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  hasPassword: PropTypes.bool.isRequired
};

const boardPostPropShape = {
  author: PropTypes.shape(commonUserPropShape).isRequired,
  id: PropTypes.number.isRequired,
  isRead: PropTypes.bool.isRequired,
  stamp: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

module.exports = {
  siteStatusValues: siteStatusValues,
  fieldValidStates: fieldValidStates,
  gamesListProp: gamesListProp,
  currentUserPropShape: currentUserPropShape,
  commonUserPropShape: commonUserPropShape,
  playersPropShape: playersPropShape,
  gamePropShape: gamePropShape,
  boardPostPropShape: boardPostPropShape
};
