import React, { Component, PropTypes } from 'react';
import { _ } from '../../localize.js';

require('../../settlers.scss');


const boardSkins = ['real', 'simple'];
const boardFieldNames = ['clay', 'grain', 'sea', 'wood', 'rock', 'sheep', 'desert'];
const boardMaterialNames = ['clay', 'grain', 'wood', 'rock', 'sheep'];
const boardMaterialLabels = ['Clay', 'Grain', 'Wood', 'Rock', 'Sheep'];
const pieceColors = ['red', 'orange', 'pink', 'green', 'black', 'purple', 'light_blue', 'dark_blue', 'brown', 'dark_green'];

const boardMaterialNameToLabel {
  clay: 'Clay', grain: 'Grain', wood: 'Wood', rock: 'Rock', sheep: 'Sheep'
};


import { BoardAssets } from './BoardAssets.jsx';


class Material extends Component {
  static propTypes = {
    skin: PropTypes.oneOf(boardSkins).isRequired,
    name: PropTypes.oneOf(boardMaterialNames).isRequired,
    label: PropTypes.oneOf(boardMaterialLabels).isRequired,
    count: PropTypes.number.isRequired
  }

  render() {
    return (
      <tr>
        <td><img src={BoardAssets[this.props.skin].fields.icons[this.props.name]} />{_(self.label)}:</td>
        <td>{this.props.count}</td>
      </tr>
    );
  }
}

class CurrentPlayerResources extends Component {
  static propTypes = {
    skin: PropTypes.oneOf(boardSkins).isRequired,
    wood: PropTypes.number.isRequired,
    clay: PropTypes.number.isRequired,
    sheep: PropTypes.number.isRequired,
    grain: PropTypes.number.isRequired,
    rock: PropTypes.number.isRequired,
  }

  render() {
    return (
      <tbody>
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <Material skin={this.props.skin} name="wood" label={_('Wood')} count={this.props.wood} />
        <Material skin={this.props.skin} name="clay" label={_('Clay')} count={this.props.clay} />
        <Material skin={this.props.skin} name="sheep" label={_('Sheep')} count={this.props.sheep} />
        <Material skin={this.props.skin} name="grain" label={_('Grain')} count={this.props.grain} />
        <Material skin={this.props.skin} name="rock" label={_('Rock')} count={this.props.rock} />
        <tr><td colspan="2"><hr class="my-player-separator"/></td></tr>
        <tr>
          <td>{_('Cards')}:</td>
          <td>{this.props.cardsUnused}</td>
        </tr>
      </tbody>
    );
  }
}

class ResourceSummary extends Component {
  static propTypes = {
    label: PropTypes.oneOf(['Points', 'Resources']).isRequired,
    count: PropTypes.number.isRequired
  }

  render() {
    return (
      <tr>
        <td><strong>{this.props.label}:</strong></td>
        <td><strong>{this.props.points}</strong></td>
      </tr>
    );
  }
}

class Resource extends Component {
  static propTypes = {
    label: PropTypes.oneOf(['Knights', 'Cards']).isRequired,
    count: PropTypes.number.isRequired
  }

  render() {
    return (
      <tr>
        <td>{this.props.label}:</td>
        <td>{this.props.points}</td>
      </tr>
    );
  }
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

class Player extends Component {
  render() {
    if (this.props.isCurrent) {
      let resources = <CurrentPlayerResources
        skin={this.props.skin}
        wood={this.props.resources.wood}
        clay={this.props.resources.clay}
        sheep={this.props.resources.sheep}
        grain={this.props.resources.grain}
        rock={this.props.resources.rock} />;
    } else {
      let resources = <Resource label="Cards" count={this.props.cards.unused} />;
    }

    return (
      <div class="playable-player">
        <Header
          name={this.props.user.name}
          color={this.props.color}
          hasMightiestChilvary={this.props.hasMightiestChilvary}
          hasLongestRoad={hasLongestRoad} />

        <table>
          <ResourceSummary label={_('Points')} count={this.props.points} />
          <ResourceSummary label={_('Resources')} count={this.props.resourcesSum} />

          {resources}
          <Resource label="Knights" count={this.props.cards.usedKnights} />
        </table>
      </div>
    );
  }
}
