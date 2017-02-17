import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { FullLayout } from '../components//ui.jsx';
import { update } from '../common.js';
import { _ } from '../localize.js';
import { GameListHeader, GameListBody } from '../components/GameList.jsx';
import { updateGameList } from '../modules/games.js';
import { errorMessage } from '../modules/messageBox.js';
import { gamePropShape } from '../proptypes.js';

class ArchivePage extends Component {
  static propTypes = {
    archivedGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  render() {
    return (
      <FullLayout title={_('Archive')}>
        <table className="game-list">
          <GameListHeader label={_('Archived games')} />
          <GameListBody games={this.props.archivedGames} />
        </table>
      </FullLayout>
    );
  }
}

class ArchivePageContainer extends Component {
  static propTypes = {
    archivedGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  componentDidMount() {
    this._fetchGames();
  }

  _fetchGames = () => {
    update('/games/archived')
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(updateGameList('archivedGames', response.archived));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  render() {
    return (
      <ArchivePage archivedGames={this.props.archivedGames} />
    );
  }
}

export default connect((state) => {
  return {
    archivedGames: state.games.archivedGames
  };
})(ArchivePageContainer);
