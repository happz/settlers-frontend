import React, { Component, PropTypes } from 'react';
import { ThinLayout, Section, Form, FormRow, FinalFormRow, SubmitButton } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { SelectField } from '../components/forms/SelectField.jsx';
import { GameSelectField } from '../components/forms/GameSelectField.jsx';
import { STATUS, update } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';
import { BlockPicker } from 'react-color';
import { currentUserPropShape, gamesListProp } from '../proptypes.js';

const md5 = require('js-md5');

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


/*
 * Change e-mail
 */
class ChangeEmailForm extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      email: InputField.createInitialState(this.props.email, true)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.email === nextProps.email)
      return;

    this.setState({
      email: {
        value: nextProps.email,
        valid: true
      }
    });
  }

  _isValid = () => {
    return this.state.email.valid === true;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/settings/email', {
      email: this.state.email.value
    })
      .then(function(response) {
        if (response === null)
          return;

        STATUS.Success({
          text: _('Settings were successfully updated.')
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
      <Form legend={_('Change e-mail')}>
        <FormRow label={_('Your new e-mail address')}>
          <InputField
            value={this.state.email.value}
            valid={this.state.email.valid}
            required={true}
            showValidation={true}
            placeholder="foo@bar.bz"
            onChange={InputField.createChangeHandler(this, 'email', [validators.email])} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this._handleSubmit} disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}


/*
 * Change password
 */
class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: InputField.createInitialState('', false),
      password2: InputField.createInitialState('', false)
    };
  }

  _isValid = () => {
    return this.state.password1.valid === true && this.state.password2.valid === true;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/settings/passwd', {
      password: md5.hex(this.state.password1.value)
    })
      .then((response) => {
        if (response === null)
          return;

        this.setState((prevState, props) => {
          STATUS.Success({
            text: _('Settings were successfully updated.')
          });

          return {
            password1: InputField.createInitialState('', false),
            password2: InputField.createInitialState('', false)
          }
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
      <Form legend={_('Change password')}>
        <FormRow label={_('Password')}>
          <InputField
            type="password"
            value={this.state.password1.value}
            valid={this.state.password1.valid}
            required={true}
            showValidation={true}
            onChange={InputField.createChangeHandler(this, 'password1', [validators.password])}
            placeholder={_('2 to 256 characters')} />
        </FormRow>
        <FormRow label={_('Password verification')}>
          <InputField
            type="password"
            value={this.state.password2.value}
            valid={this.state.password2.valid}
            required={true}
            showValidation={true}
            onChange={InputField.createChangeHandler(this, 'password2', [validators.password, (value) => { return this.state.password1.value === value; }])} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this._handleSubmit} disabled={!this.state.password1.valid || !this.state.password2.valid} />
        </FinalFormRow>
      </Form>
    );
  }
}


/*
 * Change "After 'Pass Turn'" action
 */
class ChangeAfterPassTurnForm extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('Pass turn')}>
        <FormRow label={_('What to do after passing a turn?')}>
          <SelectField
            value={this.props.value.toString()}
            valid={true}
            onChange={this.props.onChange}
            showValidation={true}
            required={true}>
            <option value="0">{_('Switch to the next game')}</option>
            <option value="1">{_('Stay in the current game')}</option>
            <option value="2">{_('Switch to the current games listing')}</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class ChangeAfterPassTurnFormContainer extends Component {
  static propTypes = {
    afterPassTurn: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      afterPassTurn: this.props.afterPassTurn
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.afterPassTurn === nextProps.afterPassTurn)
      return;

    this.setState({
      afterPassTurn: nextProps.afterPassTurn
    });
  }

  _updateState = (afterPassTurn) => {
    update('/settings/after_pass_turn', {
      afterPassTurn: afterPassTurn
    })
      .then((response) => {
        if (response === null)
          return;

        STATUS.Success({
          text: _('Settings were successfully updated.')
        });
      })
      .catch(function(error, response) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleChange = (event) => {
    this.setState({
      afterPassTurn: parseInt(event.target.value, 10)
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.afterPassTurn);
  }

  render() {
    return (
      <ChangeAfterPassTurnForm value={this.state.afterPassTurn} onSubmit={this._handleSubmit} onChange={this._handleChange} />
    );
  }
}


/*
 * Per-page 
 */
class PerPageForm extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend="Items per page of table">
        <FormRow label="How many items on every page?">
          <SelectField
            value={this.props.value.toString()}
            valid={true}
            onChange={this.props.onChange}
            showValidation={true}
            required={true}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class PerPageFormContainer extends Component {
  static propTypes = {
    perPage: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      perPage: this.props.perPage
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.perPage === nextProps.perPage)
      return;

    this.setState({
      perPage: nextProps.perPage
    });
  }

  _updateState = (perPage) => {
    update('/settings/per_page', {
      perPage: perPage
    })
      .then(function(response) {
        if (response === null)
          return;

        STATUS.Success({
          text: _('Settings were successfully updated.')
        });
      })
      .catch(function(error, response) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleChange = (event) => {
    this.setState({
      perPage: parseInt(event.target.value, 10)
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.perPage);
  }

  render() {
    return (
      <PerPageForm value={this.state.perPage} onChange={this._handleChange} onSubmit={this._handleSubmit} />
    );
  }
}


/**
 * Sound
 */
class SoundForm extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend="Sound notification">
        <FormRow label="Play sound when player you are on turn?">
          <SelectField
            value={(this.props.enabled ? "1" : "0")}
            valid={true}
            onChange={this.props.onChange}
            showValidation={true}
            required={true}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class SoundFormContainer extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      enabled: this.props.enabled
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enabled === nextProps.enabled)
      return;

    this.setState({
      enabled: nextProps.enabled
    });
  }

  _updateState = (perPage) => {
    update('/settings/sound', {
      enabled: this.state.enabled
    })
      .then(function(response) {
        if (response === null)
          return;

        STATUS.Success({
          text: _('Settings were successfully updated.')
        });
      })
      .catch(function(error, response) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleChange = (event) => {
    this.setState({
      enabled: event.target.value === '1'
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.enabled);
  }

  render() {
    return (
      <SoundForm enabled={this.state.enabled} onChange={this._handleChange} onSubmit={this._handleSubmit} />
    );
  }
}


/*
 * Player's Color
 */
class PlayerColorForm extends Component {
  static propTypes = {
    game: gamesListProp,
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
            showValidation={true}
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
    return this.state.game.valid === true && this.state.color !== null;
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
      .then(function(response) {
        if (response === null)
          return;

        STATUS.Success({
          text: _('Settings were successfully updated.')
        });
      })
      .catch(function(error, response) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  render() {
    return (
      <PlayerColorForm
        game={this.state.game.value}
        color={this.state.color}
        onGameChange={this._handleGameChange}
        onColorChange={this._handleColorChange}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
    );
  }
}


/*
 * Top-level page
 */
export class SettingsPage extends Component {
  static propTypes = {
    user: PropTypes.shape(currentUserPropShape).isRequired
  }

  render() {
    return (
      <ThinLayout title={_('Settings')}>
        <Section label={_('Account')}>
          <ChangeEmailForm email={this.props.user.email} />
          <ChangePasswordForm />
          <ChangeAfterPassTurnFormContainer afterPassTurn={this.props.user.afterPassTurn} />
          <PerPageFormContainer perPage={this.props.user.perPage} />
          <SoundFormContainer enabled={this.props.user.sound} />
          <PlayerColorFormContainer colors={this.props.user.colors} />
        </Section>
      </ThinLayout>
    );
  }
}
