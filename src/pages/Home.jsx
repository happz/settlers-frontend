import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FullLayout } from '../components//ui.jsx';
import { update } from '../common.js';
import { _ } from '../localize.js';
import { GameListHeader, GameListBody } from '../components/GameList.jsx';
import { updateGameList } from '../modules/games.js';
import { gamePropShape } from '../proptypes.js';
import { errorMessage } from '../modules/messageBox.js';

class HomePage extends Component {
  static propTypes = {
    activeGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired,
    freeGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired,
    inactiveGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  render() {
    return (
      <FullLayout title={_('Home')}>
        <table className="game-list">
          <GameListHeader label={_('Active')} />
          <GameListBody games={this.props.activeGames} />
          <GameListHeader label={_('Free')} />
          <GameListBody games={this.props.freeGames} />
          <GameListHeader label={_('Inactive')} />
          <GameListBody games={this.props.inactiveGames} />
        </table>
      </FullLayout>
    );
  }
}

class HomePageContainer extends Component {
  static propTypes = {
    activeGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired,
    freeGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired,
    inactiveGames: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  constructor(props) {
    super(props);

    this._updateTimer = null;
  }

  componentDidMount() {
    this._updateTimer = setInterval(this._fetchGames, 300000);
    this._fetchGames();
  }

  componentWillunmount() {
    if (this._updateTimer !== null) {
      clearInterval(this._updateTimer);
      this._updateTimer = null;
    }
  }

  _fetchGames = () => {
    update('/games')
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(updateGameList('activeGames', response.active));
        this.props.dispatch(updateGameList('freeGames', response.free));
        this.props.dispatch(updateGameList('inactiveGames', response.inactive));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  render() {
    return (
      <HomePage
        activeGames={this.props.activeGames}
        freeGames={this.props.freeGames}
        inactiveGames={this.props.inactiveGames} />
    );
  }
}

export default connect((state) => {
  return {
    activeGames: state.games.activeGames,
    freeGames: state.games.freeGames,
    inactiveGames: state.games.inactiveGames
  };
})(HomePageContainer);
