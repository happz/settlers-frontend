import React, { Component, PropTypes } from 'react';

import { Form, FormRow, FinalFormRow } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { SelectField } from '../components/forms/SelectField.jsx';
import GameSelectField from '../components/forms/GameSelectField.jsx';
import SubmitButton from '../components/forms/SubmitButton.jsx';
import { update } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';
import { gamesListProp, fieldValidStates } from '../proptypes.js';
import store from '../store.js';
import {successMessage, errorMessage } from '../modules/messageBox.js';

class NewGameForm extends Component {
  static propTypes = {
    game: gamesListProp.isRequired,
    gameValid: fieldValidStates.isRequired,
    onGameChange: PropTypes.func.isRequired,

    name: PropTypes.string.isRequired,
    nameValid: fieldValidStates.isRequired,
    onNameChange: PropTypes.func.isRequired,

    numberOfPlayers: PropTypes.oneOf(['3', '4']).isRequired,
    onNumberOfPlayersChange: PropTypes.func.isRequired,

    description: PropTypes.string.isRequired,
    descriptionValid: fieldValidStates.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,

    opponent1: PropTypes.string.isRequired,
    opponent1Valid: fieldValidStates.isRequired,
    onOpponent1Change: PropTypes.func.isRequired,

    opponent2: PropTypes.string.isRequired,
    opponent2Valid: fieldValidStates.isRequired,
    onOpponent2Change: PropTypes.func.isRequired,

    opponent3: PropTypes.string.isRequired,
    opponent3Valid: fieldValidStates.isRequired,
    onOpponent3Change: PropTypes.func.isRequired,

    password: PropTypes.string.isRequired,
    passwordValid: fieldValidStates.isRequired,
    onPasswordChange: PropTypes.func.isRequired,

    floatingDesert: PropTypes.oneOf(['0', '1']).isRequired,
    onFloatingDesertChange: PropTypes.func.isRequired,

    isValid: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('New game')}>
        <FormRow>
          <GameSelectField
            value={this.props.game}
            required={true}
            onChange={this.props.onGameChange} />
        </FormRow>
        { this.props.gameValid === 'valid' &&
            <div>
              <FormRow label="Name of the game">
                <InputField
                  value={this.props.name}
                  valid={this.props.nameValid}
                  required={true}
                  onChange={this.props.onNameChange} />
              </FormRow>
              <FormRow label="Number of players">
                <SelectField
                  value={this.props.numberOfPlayers}
                  valid="valid"
                  required={true}
                  onChange={this.props.onNumberOfPlayersChange}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </SelectField>
              </FormRow>
              <FormRow label="Description of the game">
                <InputField
                  value={this.props.description}
                  valid={this.props.descriptionValid}
                  required={false}
                  onChange={this.props.onDescriptionChange} />
              </FormRow>

              <div className="pure-controls">
                <span className="pure-form-message-inline">You can invite other players</span>
              </div>
              <FormRow label="Opponent #1">
                <InputField
                  value={this.props.opponent1}
                  valid={this.props.opponent1Valid}
                  required={false}
                  onChange={this.props.onOpponent1Change} />
              </FormRow>
              <FormRow label="Opponent #2">
                <InputField
                  value={this.props.opponent2}
                  valid={this.props.opponent2Valid}
                  required={false}
                  onChange={this.props.onOpponent2Change} />
              </FormRow>
              { this.props.numberOfPlayers === '4' &&
                <FormRow label="Opponent #3">
                  <InputField
                    value={this.props.opponent3}
                    valid={this.props.opponent3Valid}
                    required={false}
                    onChange={this.props.onOpponent3Change} />
                </FormRow>
              }

              <div className="pure-controls">
                <span className="pure-form-message-inline">You can set a password for a game</span>
              </div>
              <FormRow label="Password">
                <InputField
                  value={this.props.password}
                  valid={this.props.passwordValid}
                  required={false}
                  onChange={this.props.onPasswordChange} />
              </FormRow>

              <div className="pure-controls">
                <span className="pure-form-message-inline">Additional rules</span>
              </div>
              <FormRow label="Floating desert?">
                <SelectField
                  value={this.props.floatingDesert}
                  valid="valid"
                  required={false}
                  onChange={this.props.onFloatingDesertChange}>
                  <option value="0">Ne</option>
                  <option value="1">Ano</option>
                </SelectField>
              </FormRow>
            </div>
        }
        <FinalFormRow>
          <SubmitButton label={_('Create')} onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: GameSelectField.createInitialState(),
      name: InputField.createInitialState('', 'invalid'),
      numberOfPlayers: SelectField.createInitialState('3', 'valid'),
      description: InputField.createInitialState('', 'unknown'),
      opponent1: InputField.createInitialState('', 'unknown'),
      opponent2: InputField.createInitialState('', 'unknown'),
      opponent3: InputField.createInitialState('', 'unknown'),
      password: InputField.createInitialState('', 'unknown'),
      floatingDesert: SelectField.createInitialState('1', 'valid'),
    };
  }

  _isValid = () => {
    return this.state.game.valid === 'valid'
      && this.state.name.valid === 'valid'
      && this.state.numberOfPlayers.valid === 'valid'
      && (this.state.description.valid === 'valid' || this.state.description.valid === 'unknown')
      && (this.state.opponent1.valid === 'valid' || this.state.opponent1.valid === 'unknown')
      && (this.state.opponent2.valid === 'valid' || this.state.opponent2.valid === 'unknown')
      && (this.state.opponent3.valid === 'valid' || this.state.opponent3.valid === 'unknown')
      && (this.state.password.valid === 'valid' || this.state.password.valid === 'unknown')
      && this.state.floatingDesert.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/new', {
      game: this.state.game.value,
      name: this.state.name.value,
      numberOfPlayers: this.state.numberOfPlayers.value,
      description: this.state.description.value,
      opponent1: this.state.opponent1.value,
      opponent2: this.state.opponent2.value,
      opponent3: this.state.opponent3.value,
      password: this.state.password.value,
      floatingDesert: this.state.floatingDesert.value === '1'
    }).then((response) => {
      if (response === null)
        return;

      store.dispatch(successMessage({
        text: _('Game successfully created.')
      }));
    }).catch((error) => {
      store.dispatch(errorMessage({
        text: error.message
      }));
    });
  }

  render() {
    return (
      <NewGameForm
        game={this.state.game.value}
        gameValid={this.state.game.valid}
        onGameChange={GameSelectField.createChangeHandler(this, 'game')}
        name={this.state.name.value}
        nameValid={this.state.name.valid}
        onNameChange={InputField.createChangeHandler(this, 'name', [validators.notblank])}
        numberOfPlayers={this.state.numberOfPlayers.value}
        onNumberOfPlayersChange={SelectField.createChangeHandler(this, 'numberOfPlayers', [validators.oneOf(['3', '4'])])}
        description={this.state.description.value}
        descriptionValid={this.state.description.valid}
        onDescriptionChange={InputField.createChangeHandler(this, 'description')}
        opponent1={this.state.opponent1.value}
        opponent1Valid={this.state.opponent1.valid}
        onOpponent1Change={InputField.createChangeHandler(this, 'opponent1', [validators.username])}
        opponent2={this.state.opponent2.value}
        opponent2Valid={this.state.opponent2.valid}
        onOpponent2Change={InputField.createChangeHandler(this, 'opponent2', [validators.username])}
        opponent3={this.state.opponent3.value}
        opponent3Valid={this.state.opponent3.valid}
        onOpponent3Change={InputField.createChangeHandler(this, 'opponent3', [validators.username])}
        password={this.state.password.value}
        passwordValid={this.state.password.valid}
        onPasswordChange={InputField.createChangeHandler(this, 'password')}
        floatingDesert={this.state.floatingDesert.value}
        onFloatingDesertChange={SelectField.createChangeHandler(this, 'floatingDesert', [validators.oneOf(['0', '1'])])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid}
      />
    );
  }
}
