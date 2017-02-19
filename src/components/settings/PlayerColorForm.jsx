import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import GameSelectField from '../forms/GameSelectField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { _ } from '../../localize.js';
import { BlockPicker } from 'react-color';
import { gamesListProp } from '../../proptypes.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

const Colors = {
  colorList: [
    [ 'pink', '#ffc0cb' ],
    [ 'black', '#000000' ],
    [ 'green', '#008000' ],
    [ 'purple', '#800080' ],
    [ 'dark_blue', '#00008b' ],
    [ 'brown', '#a52a2a' ],
    [ 'orange', '#ffa500' ],
    [ 'light_blue', '#add8e6' ],
    [ 'dark_green', '#006400' ]
  ],

  colorToCode: (color) => {
    for(var i = 0; i < Colors.colorList.length; i++) {
      var c = Colors.colorList[i];
      if (c[0] === color)
        return c[1];
    }
    return '#BFBFBF';
  },

  codeToColor: (code) => {
    for(var i = 0; i < Colors.colorList.length; i++) {
      var c = Colors.colorList[i];
      if (c[1] === code)
        return c[0];
    }
    return 'gray';
  }
};

class PlayerColorForm extends Component {
  static propTypes = {
    game: gamesListProp.isRequired,
    color: PropTypes.string,
    onGameChange: PropTypes.func.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this._colorList = [];

    for(var i = 0; i < Colors.colorList.length; i++)
      this._colorList.push(Colors.colorList[i][1]);
  }

  render() {
    return (
      <Form legend={ _('Favourite color') }>
        <FormRow>
          <GameSelectField
            value={this.props.game}
            required={true}
            onChange={this.props.onGameChange} />
        </FormRow>
        { this.props.game !== '' &&
            <FinalFormRow>
              <BlockPicker
                color={this.props.color}
                colors={this._colorList}
                onChange={this.props.onColorChange}
                triangle="hide"
                width="170px" />
            </FinalFormRow>
        }
        <FinalFormRow>
          <SubmitButton label={ _('Set') } onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class PlayerColorFormContainer extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      game: GameSelectField.createInitialState(),
      color: null
    };

    this._gameChangeHandler = GameSelectField.createChangeHandler(this, 'game');
  }

  _isValid = () => {
    return this.state.game.valid === 'valid' && this.state.color !== null;
  }

  _handleGameChange = (event) => {
    this._gameChangeHandler(event);

    const value = event.target.value;

    this.setState({
      color: (value === '' ? null : Colors.colorToCode(this.props.colors[value]))
    });
  }

  _handleColorChange = (color, event) => {
    this.setState({
      color: color.hex
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/settings/color', {
      game: this.state.game.value,
      color: Colors.codeToColor(this.state.color)
    })
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Settings were successfully updated.')
        }));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  render() {
    return (
      <PlayerColorForm
        color={this.state.color}
        game={this.state.game.value}
        isValid={this._isValid}
        onColorChange={this._handleColorChange}
        onGameChange={this._handleGameChange}
        onSubmit={this._handleSubmit}
      />
    );
  }
}

export default connect((state) => {
  return {
    colors: state.user.colors
  };
})(PlayerColorFormContainer);
