import React, { Component } from 'react';
import { ThinLayout, Section, Form, FormRow, FinalFormRow, SubmitButton } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { SelectField } from '../components/forms/SelectField.jsx';
import { GameSelectField } from '../components/forms/GameSelectField.jsx';
import { STATUS, update } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';

class NewGameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: GameSelectField.createInitialState(),
      name: InputField.createInitialState('', false),
      numberOfPlayers: SelectField.createInitialState('3', true),
      description: InputField.createInitialState('', true),
      opponent1: InputField.createInitialState('', true),
      opponent2: InputField.createInitialState('', true),
      opponent3: InputField.createInitialState('', true),
      password: InputField.createInitialState('', true),
      floatingDesert: SelectField.createInitialState('1', true),
    };
  }

  _isValid = () => {
    return this.state.game.valid === true
      && this.state.name.valid === true
      && this.state.numberOfPlayers.valid === true
      && this.state.description.valid === true
      && this.state.opponent1.valid === true
      && this.state.opponent2.valid === true
      && this.state.password.valid === true
      && this.state.floatingDesert.valid === true;
  }

  _handleGameChange = (event) => {
    this.setState({
      game: event.target.value
    });
  }

  _handleNumberOfPlayersChange = (event) => {
    this.setState({
      numberOfPlayers: parseInt(event.target.value, 10)
    });
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

      STATUS.Success({
        text: _('Game successfully created.')
      });
    }).catch((error) => {
      STATUS.Error({
        text: error.message
      });
    });
  }

  render() {
    console.log('RENDER:');
    console.log(this.state);

    return (
      <Form legend={_('New game')}>
        <FormRow>
          <GameSelectField
            value={this.state.game.value}
            required={true}
            showValidation={true}
            onChange={GameSelectField.createChangeHandler(this, 'game')} />
        </FormRow>
        { this.state.game.valid === true &&
            <div>
              <FormRow label="Name of the game">
                <InputField
                  value={this.state.name.value}
                  valid={this.state.name.valid}
                  required={true}
                  showValidation={true}
                  onChange={InputField.createChangeHandler(this, 'name', [validators.notblank])} />
              </FormRow>
              <FormRow label="Number of players">
                <SelectField
                  value={this.state.numberOfPlayers.value}
                  valid={true}
                  required={true}
                  showValidation={true}
                  onChange={SelectField.createChangeHandler(this, 'numberOfPlayers', [validators.oneOf(['3', '4'])])}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </SelectField>
              </FormRow>
              <FormRow label="Description of the game">
                <InputField
                  value={this.state.description.value}
                  valid={this.state.description.valid}
                  required={false}
                  showValidation={true}
                  onChange={InputField.createChangeHandler(this, 'description')} />
              </FormRow>

              <div className="pure-controls">
                <span className="pure-form-message-inline">You can invite other players</span>
              </div>
              <FormRow label="Opponent #1">
                <InputField
                  value={this.state.opponent1.value}
                  valid={this.state.opponent1.valid}
                  required={false}
                  showValidation={true}
                  onChange={InputField.createChangeHandler(this, 'opponent1', [validators.username])} />
              </FormRow>
              <FormRow label="Opponent #2">
                <InputField
                  value={this.state.opponent2.value}
                  valid={this.state.opponent2.valid}
                  required={false}
                  showValidation={true}
                  onChange={InputField.createChangeHandler(this, 'opponent2', [validators.username])} />
              </FormRow>
              { this.state.numberOfPlayers.value === '4' &&
                <FormRow label="Opponent #3">
                  <InputField
                    value={this.state.opponent3.value}
                    valid={this.state.opponent3.valid}
                    required={false}
                    showValidation={true}
                    onChange={InputField.createChangeHandler(this, 'opponent3', [validators.username])} />
                </FormRow>
              }

              <div className="pure-controls">
                <span className="pure-form-message-inline">You can set a password for a game</span>
              </div>
              <FormRow label="Password">
                <InputField
                  value={this.state.password.value}
                  valid={this.state.password.valid}
                  required={false}
                  showValidation={true}
                  onChange={InputField.createChangeHandler(this, 'password', [validators.password])} />
              </FormRow>

              <div className="pure-controls">
                <span className="pure-form-message-inline">Dodatecna pravidla:</span>
              </div>
              <FormRow label="Floating desert?">
                <SelectField
                  value={this.state.floatingDesert.value}
                  valid={true}
                  required={false}
                  showValidation={true}
                  onChange={SelectField.createChangeHandler(this, 'floatingDesert', [validators.oneOf(['0', '1'])])}>
                  <option value="0">Ne</option>
                  <option value="1">Ano</option>
                </SelectField>
              </FormRow>
            </div>
        }
        <FinalFormRow>
          <SubmitButton label={_('Create')} onClick={this._handleSubmit} disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}


/*
 * Top-level page
 */
export class NewPage extends Component {
  render() {
    return (
      <ThinLayout title={_('New')}>
        <Section label={_('Game')}>
          <NewGameForm />
        </Section>
      </ThinLayout>
    );
  }
}
