import React, { Component, PropTypes } from 'react';
import { FullLayout } from '../components//ui.jsx';
import { STATUS, update } from '../common.js';
import { _ } from '../localize.js';
import { GameListHeader, GameListBody } from '../components/GameList.jsx';

const log = require('loglevel');

import { currentUserPropShape } from '../proptypes.js';

export class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape(currentUserPropShape).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      active: [],
      free: [],
      inactive: []
    };

    this._updateTimer = null;
  }

  componentDidMount() {
    this._fetchGames();

    this._updateTimer = setInterval(this._fetchGames, 300000);
  }

  componentWillunmount() {
    if (this._updateTimer !== null) {
      clearInterval(this._updateTimer);
      this._updateTimer = null;
    }
  }

  _fetchGames = () => {
    log.warn('HomePage._fetchGames:');

    update('/games')
      .then((response) => {
        if (response === null)
          return;

        this.setState({
          active: response.active,
          free: response.free,
          inactive: response.inactive
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  render() {
    return (
      <FullLayout title={_('Home')}>
        <table className="game-list">
          <GameListHeader label={_('Active')} />
          <GameListBody games={this.state.active} />
          <GameListHeader label={_('Free')} />
          <GameListBody games={this.state.free} />
          <GameListHeader label={_('Inactive')} />
          <GameListBody games={this.state.inactive} />
        </table>
      </FullLayout>
    );
  }
}
