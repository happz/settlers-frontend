import React, { Component } from 'react';

require('../../settlers.scss');


const pieceColors = ['red', 'orange', 'pink', 'green', 'black', 'purple', 'light_blue', 'dark_blue', 'brown', 'dark_green'];


class Material extends Component {
  static propTypes = {
    board_skin: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }

  render() {
    let image = `/static/images/games/settlers/board/${this.props.board_skin}/icons/${this.props.name}.gif`;

    return (
      <tr>
        <td><img src={image} />Wood:</td>
        <td>{this.props.count}</td>
      </tr>
    );
  }
}

class CurrentPlayerResources extends Component {
  render() {
    return (
      <table>
        <tr>
          <td><strong>{{= window.hlib._g("Points")}}:</strong></td>
          <td><strong>{this.props.points}</strong></td>
        </tr>
        <tr>
          <td><strong>{{= window.hlib._g("Resources")}}:</td>
          <td><strong>{this.props.resources_total}<strong></td>
        </tr>

        { this.props.isCurrent === true &&
            <Material 
      {{? it.my_player}}
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/wood.gif" />{{= window.hlib._g("Wood")}}:</td><td>{{= it.resources.wood}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/clay.gif" />{{= window.hlib._g("Clay")}}:</td><td>{{= it.resources.clay}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/sheep.gif" />{{= window.hlib._g("Sheep")}}:</td><td>{{= it.resources.sheep}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/grain.gif" />{{= window.hlib._g("Grain")}}:</td><td>{{= it.resources.grain}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/rock.gif" />{{= window.hlib._g("Rock")}}:</td><td>{{= it.resources.rock}}</td></tr>
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr rel="tooltip" data-placement="right" title="{{= it.cards.unused_cards_str}}"><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{??}}
        <tr><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{?}}
      <tr><td>{{= window.hlib._g("Knights")}}:</td><td>{{= it.cards.used_knights}}</td></tr>
}

class PlayerResources extends Component {
    <table class="table table-condensed">
      <tr><td><strong>{{= window.hlib._g("Points")}}:</strong></td><td><strong>{{= it.points}}</strong></td></tr>
      <tr><td><strong>{{= window.hlib._g("Resources")}}:</td><td><strong>{{= it.resources.total}}<strong></td></tr>

      {{? it.my_player}}
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/wood.gif" />{{= window.hlib._g("Wood")}}:</td><td>{{= it.resources.wood}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/clay.gif" />{{= window.hlib._g("Clay")}}:</td><td>{{= it.resources.clay}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/sheep.gif" />{{= window.hlib._g("Sheep")}}:</td><td>{{= it.resources.sheep}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/grain.gif" />{{= window.hlib._g("Grain")}}:</td><td>{{= it.resources.grain}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/rock.gif" />{{= window.hlib._g("Rock")}}:</td><td>{{= it.resources.rock}}</td></tr>
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr rel="tooltip" data-placement="right" title="{{= it.cards.unused_cards_str}}"><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{??}}
        <tr><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{?}}
      <tr><td>{{= window.hlib._g("Knights")}}:</td><td>{{= it.cards.used_knights}}</td></tr>
}

class PlayerResources extends Component {
    <table class="table table-condensed">
      <tr><td><strong>{{= window.hlib._g("Points")}}:</strong></td><td><strong>{{= it.points}}</strong></td></tr>
      <tr><td><strong>{{= window.hlib._g("Resources")}}:</td><td><strong>{{= it.resources.total}}<strong></td></tr>

      {{? it.my_player}}
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/wood.gif" />{{= window.hlib._g("Wood")}}:</td><td>{{= it.resources.wood}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/clay.gif" />{{= window.hlib._g("Clay")}}:</td><td>{{= it.resources.clay}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/sheep.gif" />{{= window.hlib._g("Sheep")}}:</td><td>{{= it.resources.sheep}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/grain.gif" />{{= window.hlib._g("Grain")}}:</td><td>{{= it.resources.grain}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/rock.gif" />{{= window.hlib._g("Rock")}}:</td><td>{{= it.resources.rock}}</td></tr>
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr rel="tooltip" data-placement="right" title="{{= it.cards.unused_cards_str}}"><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{??}}
        <tr><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{?}}
      <tr><td>{{= window.hlib._g("Knights")}}:</td><td>{{= it.cards.used_knights}}</td></tr>
}


class MightestChivalryTag extends Component {
  render() {
    return (
      <span className="settlers-player-title-icon settlers-icon-mightiest-chilvary" />
    );
  }
}

class LongestRoadTag extends Component {
  render() {
    return (
      <span className="settlers-player-title-icon settlers-icon-longest-path" />
    );
  }
}

class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.oneOf(pieceColors).isRequired,
    hasMightiestChilvary: PropTypes.bool.isRequired,
    hasLongestPath: PropTypes.bool.isRequired
  }

  render() {
    let headerClass = `settlers-game-player-header-${this.props.color}`;

    return (
      <div className={headerClass}>
        <h4>
          {this.props.name}
          <div className="pull-right">
            { this.props.hasMightiestChilvary && <MightestChivalryTag /> }
            { this.props.hasLongestRoad && <LongestRoadTag /> }
          </div>
        </h4>
      </div>
    );
  }
}

window.settlers.templates.game.player = doT.template '
  <div class="playable-player">
    <Header
      name={this.props.user.name}
      color={this.props.color}
      hasMightiestChilvary={this.props.hasMightiestChilvary}
      hasLongestRoad={hasLongestRoad} />

    <table class="table table-condensed">
      <tr><td><strong>{{= window.hlib._g("Points")}}:</strong></td><td><strong>{{= it.points}}</strong></td></tr>
      <tr><td><strong>{{= window.hlib._g("Resources")}}:</td><td><strong>{{= it.resources.total}}<strong></td></tr>

      {{? it.my_player}}
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/wood.gif" />{{= window.hlib._g("Wood")}}:</td><td>{{= it.resources.wood}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/clay.gif" />{{= window.hlib._g("Clay")}}:</td><td>{{= it.resources.clay}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/sheep.gif" />{{= window.hlib._g("Sheep")}}:</td><td>{{= it.resources.sheep}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/grain.gif" />{{= window.hlib._g("Grain")}}:</td><td>{{= it.resources.grain}}</td></tr>
        <tr><td><img src="/static/images/games/settlers/board/{{= window.settlers.game.render_info.board_skin}}/icons/rock.gif" />{{= window.hlib._g("Rock")}}:</td><td>{{= it.resources.rock}}</td></tr>
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr rel="tooltip" data-placement="right" title="{{= it.cards.unused_cards_str}}"><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{??}}
        <tr><td>{{= window.hlib._g("Cards")}}:</td><td>{{= it.cards.unused_cards}}</td></tr>
      {{?}}
      <tr><td>{{= window.hlib._g("Knights")}}:</td><td>{{= it.cards.used_knights}}</td></tr>
    </table>
  </div>
'

