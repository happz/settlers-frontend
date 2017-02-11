import React, { Component, PropTypes } from 'react';
import { Username } from '../components/Username.jsx';
import { _ } from '../localize.js';

const log = require('loglevel');
const FontAwesome = require('react-fontawesome');

import { playerPropShape, gamePropShape } from '../proptypes.js';

class GameButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    badge: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    badge: null
  }

  render() {
    return (
      <span className="game-toolbar-button" title={_(this.props.label)} onClick={this.props.onClick}>
        <FontAwesome tag="i" name={this.props.icon} />
        { this.props.badge && <span>{this.props.badge}</span> }
      </span>
    );
  }
}

class GameToolbar extends Component {
  static propTypes = {
    isPresent: PropTypes.bool.isRequired,
    isInvited: PropTypes.bool.isRequired,
    isFinished: PropTypes.bool.isRequired,
    onJoin: PropTypes.func.isRequired,
    onBoard: PropTypes.func.isRequired,
    onHistory: PropTypes.func.isRequired,
    onChat: PropTypes.func.isRequired,
    onStats: PropTypes.func.isRequired
  }

  render() {
    if (this.props.isPresent === true) {
      if (this.props.isInvited === true)
        return (
          <div className="game-toolbar">
            <GameButton label="Join" icon="check" onClick={this.props.onJoin} />
          </div>
        );

      return (
        <div className="game-toolbar">
          <GameButton label="Show board" icon="info" onClick={this.props.onBoard} />
          <GameButton label="Show history" icon="clipboard" onClick={this.props.onHistory} />
          <GameButton label="Show chat" icon="comment" onClick={this.props.onChat} />
          { this.props.isFinished && <GameButton label="Show stats" icon="bar-chart" onClick={this.props.onStats} /> }
        </div>
      );
    }

    return (
      <div className="game-toolbar">
        <GameButton label="Join" icon="check" onClick={this.props.onJoin} />
      </div>
    );
  }
}

class GamePlayers extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape(playerPropShape)).isRequired
  }

  _handleClick = (event) => {
  }

  render() {
    return (
      <div>
        {
          this.props.players.map((player, index) => {
            return (
              <span key={player.id}>
                <Username
                  name={player.user.name}
                  isOnline={player.user.isOnline}
                  isConfirmed={player.isConfirmed}
                  isOnTurn={player.isOnTurn}
                  onClick={this._handleClick} />
                { this.props.players.length - 1 === index ? '' : ', '}
              </span>
            );
          })
        }
      </div>
    );
  }
}

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape(gamePropShape).isRequired
  }

  _handleUserClick = (event) => {
  }

  _handleJoin = (game) => {
    log.debug('Game._handleJoin: game:', game);
  }

  _handleBoard = (game) => {
    log.debug('Game._handleBoard: game:', game);
  }

  _handleHistory = (game) => {
    log.debug('Game._handleHistory: game:', game);
  }

  _handleChat = (game) => {
    log.debug('Game._handleChat: game:', game);
  }

  _handleStats = (game) => {
    log.debug('Game._handleStats: game:', game);
  }

  render() {
    const game = this.props.game;

    return (
      <tr className="game-list-game">
        <td>{_('Game')} #{game.id} - {game.name}</td>
        <td>{game.limit} {_('players')}</td>
        <td><GamePlayers players={game.players} /></td>
        <td>
          { game.isFinished && <span>{_('Winner is')} <Username name={game.forhont.user.name} isOnline={game.forhont.user.isOnline} onClick={this._handleUserClick} /></span> }
        </td>
        <td>
          <GameToolbar
            isPresent={game.isPresent}
            isInvited={game.isInvited}
            isFinished={game.isFinished}
            onJoin={(event) => { this._handleJoin(game); }}
            onBoard={(event) => { this._handleBoard(game); }}
            onHistory={(event) => { this._handleHistory(game); }}
            onChat={(event) => { this._handleChat(game); }}
            onStats={(event) => { this._handleStats(game); }}
          />
        </td>
      </tr>
    );
  }
}

export class GameListHeader extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  }

  render() {
    return (
      <thead>
        <tr>
          <th>{this.props.label}</th>
          <th colSpan="3">{_('Players')}</th>
          <th />
        </tr>
      </thead>
    );
  }
}

export class GameListBody extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.shape(gamePropShape)).isRequired
  }

  render() {
    return (
      <tbody>
        {
          this.props.games.map((game) => {
            return (
              <Game key={game.id} game={game} />
            );
          })
        }
      </tbody>
    );
  }
}
