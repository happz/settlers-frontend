import { combineReducers } from 'redux'

import game from './modules/game.js';
import games from './modules/games.js';
import navbar from './modules/navbar.js';
import jwt from './modules/jwt.js';
import messageBox from './modules/messageBox.js';
import page from './modules/page.js';
import siteStatus from './modules/siteStatus.js';
import tasks from './modules/tasks.js';
import user from './modules/user.js';

export default combineReducers({
  games: games,
  game: game,
  jwt: jwt,
  messageBox: messageBox,
  navbar: navbar,
  page: page,
  siteStatus: siteStatus,
  tasks: tasks,
  user: user
})
