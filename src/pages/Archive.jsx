import React, { Component, PropTypes } from 'react';
import { FullLayout } from '../components//ui.jsx';
import { STATUS, update } from '../common.js';
import { _ } from '../localize.js';
import { GameListHeader, GameListBody } from '../components/GameList.jsx';

const log = require('loglevel');

import { currentUserPropShape, gamePropShape } from '../proptypes.js';

class ArchivePage extends Component {
  static propTypes = {
    user: PropTypes.shape(currentUserPropShape).isRequired,
    games: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  render() {
    return (
      <FullLayout title={_('Archive')}>
        <table className="game-list">
          <GameListHeader label={_('Archived games')} />
          <GameListBody games={this.props.games} />
        </table>
      </FullLayout>
    );
  }
}

export class ArchivePageContainer extends Component {
  static propTypes = {
    user: PropTypes.shape(currentUserPropShape).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      archived: []
    };
  }

  componentDidMount() {
    this._fetchGames();
  }

  _fetchGames = () => {
    log.warn('ArchivePageContainer._fetchGames:');

    update('/games/archived')
      .then((response) => {
        if (response === null)
          return;

        this.setState({
          archived: response.archived
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
      <ArchivePage user={this.props.user} games={this.state.archived} />
    );
  }
}
