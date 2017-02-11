import React, { Component, PropTypes } from 'react';
import { ThinLayout, Section, Form, FormRow, FinalFormRow, SubmitButton } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { SelectField } from '../components/forms/SelectField.jsx';
import { STATUS, update, mapObject } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';
import { commonUserPropShape } from '../proptypes.js';

const log = require('loglevel');

/*

${ui_page_header('Administration')}

<div class="row-fluid">
  <div class="offset2 span10">

<!-- "Trumpet" section -->
${ui_section_header('trumpet', 'Trumpet')}

  <!-- Change board -->
  ${ui_form_start(action = '/admin/trumpet/change_board', legend = 'Change board', id = 'board')}
    ${ui_textarea(form_name = 'text', label = 'Text', value = lib.trumpet.Board().text, size = 'xxlarge')}

    <div class="control-group">
      <div class="hide board-preview offset1 span7" id="preview">
      </div>
    </div>

    <div class="control-group">
      <div class="controls">
        <input class="btn" type="submit" value="${_('Set')}">
        <input class="btn btn-info btn-preview" type="button" value="${_('Preview')}">
      </div>
    </div>
  ${ui_form_end()}

  <!-- Change password recovery mail -->
  ${ui_form_start(action = '/admin/trumpet/change_password_recovery_mail', legend = 'Change "Password recovery" mail', id = 'password_recovery_mail')}
    ${ui_input(form_name = 'subject', type = 'text', label = 'Subject', value = lib.trumpet.PasswordRecoveryMail().subject, size = 'xxlarge')}
    ${ui_textarea(form_name = 'text', label = 'Text', value = lib.trumpet.PasswordRecoveryMail().text, size = 'xxlarge')}
    ${ui_submit(value = 'Set')}
  ${ui_form_end()}

</section>

<!-- "Language" section -->
${ui_section_header('language', 'Language')}

  <!-- Add token -->
  ${ui_form_start(action = '/admin/i18n/add', legend = 'Add token', id = 'i18n_add')}

    <!-- Language -->
    ${ui_select_start(form_name = 'lang', label = 'Language', default = 'Choose...')}
      % for key in hruntime.dbroot.localization.languages.keys():
        ${ui_select_option(value = key, selected = False, label = str(key))}
      % endfor
    ${ui_select_end()}

    <div class="hide" id="i18n_add_missing"></div>

    ${ui_input(form_name = 'name', type = 'text', label = 'Name', disabled = True, placeholder = _('Choose language first...'))}
    ${ui_input(form_name = 'value', type = 'text', label = 'Value', disabled = True, placeholder = _('Choose language first...'))}

    ${ui_submit(value = 'Add', id = 'i18n_add_submit', disabled = True)}
  ${ui_form_end()}

  <!-- Edit token -->
  ${ui_form_start(action = '/admin/i18n/edit', legend = 'Edit tokens', id = 'i18n_edit')}
    ${ui_select_start(form_name = 'lang', label = 'Language', default = 'Choose...')}
      % for key in hruntime.dbroot.localization.languages.keys():
        ${ui_select_option(value = key, selected = False, label = key)}
      % endfor
    ${ui_select_end()}

    <div id="i18n_edit_unused"></div>

    ${ui_select_start(form_name = 'name', label = 'Token', disabled = True, placeholder = _('Choose language first...'))}
      <option value="" disabled="disabled">Choose language first...</option>
    ${ui_select_end()}

    ${ui_textarea(form_name = 'value', size = 'xxlarge', disabled = True, placeholder = _('Choose language first...'))}

    <div class="control-group">
      <div class="controls">
        <input id="i18n_edit_submit" class="btn" type="submit" value="Upravit">
        <button id="i18n_edit_remove" class="btn btn-danger hide" disabled="disabled">${_('Remove token')}</button>
      </div>
    </div>
  ${ui_form_end()}

</section>

<!-- "Donations" section -->
${ui_section_header('donations', 'Donations')}
  <!-- Add donor -->
  ${ui_form_start(action = '/admin/donations/add', legend = 'Add donation', id = 'donations_add')}
    ${ui_input(form_name = 'username', type = 'text', label = 'Username')}
    ${ui_input(form_name = 'amount', type = 'text', label = 'Amount')}

    ${ui_submit(value = 'Add')}
  ${ui_form_end()}

  <div id="donations_list" class="listview grid-layout"></div>
</section>
*/


/*
 * Maintenance enabled/disabled.
 */
class MaintenanceStateForm extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend="Maintenance mode">
        <FormRow>
          <SelectField
            value={this.props.enabled ? '1' : '0'}
            valid={true}
            onChange={this.props.onChange}
            showValidation={true}
            required={true}>
            <option value="0">Disabled</option>
            <option value="1">Enabled</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class MaintenanceStateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: null
    };
  }

  componentDidMount() {
    this._fetchMaintenanceState();
  }

  _fetchMaintenanceState = () => {
    update('/admin/maintenance/')
      .then((payload) => {
        log.debug('fetch(/admin/maintenance/): userspace response: %O', payload);

        if (payload === null)
          return;

        this.setState({
          enabled: payload.enabled
        });
      })
      .catch(function(error) {
        log.debug('fetch(/admin/maintenance/): userspace catch: %O', error);

        STATUS.Error({
          text: _(error.message)
        });
      });
  }

  _updateMaintenanceState = () => {
    update('/admin/maintenance/', {
        enabled: this.state.enabled
      })
      .then((payload) => {
        log.debug('fetch(/admin/maintenance/): userspace response: %O', payload);

        if (payload === null)
          return;

        STATUS.Success({
          text: _('Maintenance state successfully saved.'),
          onClose: () => {
            this._fetchMaintenanceState();
          }
        });
      })
      .catch(function(error) {
        log.debug('fetch(/admin/maintenance/): userspace catch: %O', error);

        STATUS.Error({
          text: _(error.message)
        });
      });
  }

  _handleChange = (event) => {
    event.preventDefault();

    this.setState({
      enabled: (event.target.value === '1')
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateMaintenanceState();
  }

  render() {
    if (this.state.enabled === null)
      return null;

    return (
      <MaintenanceStateForm enabled={this.state.enabled} onChange={this._handleChange} onSubmit={this._handleSubmit} />
    );
  }
}


/*
 * Maintenance access
 */
class GrantMaintenanceAccessForm extends Component {
  static propTypes = {
    handleGrant: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      username: InputField.createInitialState('', false)
    };
  }

  _isValid = () => {
    return this.state.username.valid === true;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    this.props.handleGrant(this.state.username.value, () => {
      this.setState({
        username: InputField.createInitialState('', false)
      });
    });
  }

  render() {
    return (
      <Form legend="Grant maintenance access">
        <FormRow>
          <InputField
            value={this.state.username.value}
            valid={this.state.username.valid}
            placeholder='User name'
            onChange={InputField.createChangeHandler(this, 'username', [validators.username])}
            showValidation={true}
            required={true} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Grant" onClick={this._handleSubmit} disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class MaintenanceAccessUser extends Component {
  static propTypes = {
    user: PropTypes.shape(commonUserPropShape).isRequired,
    onRevoke: PropTypes.func.isRequired
  }

  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>
          <button className="pure-button pure-button-primary" onClick={this.props.onRevoke}>{_('Revoke')}</button>
        </td>
      </tr>
    );
  }
}

class MaintenanceAccessUsers extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(commonUserPropShape)).isRequired,
    onRevoke: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <h4>{_('Users with maintenance access')}</h4>
        <table className="pure-table-horizontal maintenance-access-users">
          <tbody>
            {
              mapObject(this.props.users, (index, user) => {
                return <MaintenanceAccessUser user={user} key={user.name} onRevoke={(event) => { event.preventDefault(); this.props.onRevoke(user); }} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class MaintenanceAccessContainer extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this._fetchUserList();
  }

  _fetchUserList = () => {
    update('/admin/maintenance/access/')
      .then((payload) => {
        log.debug('fetch(/admin/maintenance/access/): userspace response: %O', payload);

        if (payload === null)
          return;

        this.setState({
          users: payload.users
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleGrant = (username, onSuccess) => {
    update('/admin/maintenance/access/grant', {
      username: username
    })
      .then((payload) => {
        log.debug('fetch(/admin/maintenance/access/grant): userspace response: %O', payload);

        if (payload === null)
          return;

        STATUS.Success({
          text: _('Maintenance access granted.'),
          onClose: () => {
            this._fetchUserList();
            onSuccess();
          }
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleRevoke = (user) => {
    update('/admin/maintenance/access/revoke', {
      username: user.name
    })
      .then((payload) => {
        log.debug('fetch(/admin/maintenance/access/revoke): userspace response: %O', payload);

        if (payload === null)
          return;

        STATUS.Success({
          text: _('Maintenance access revoked.'),
          onClose: () => {
            this._fetchUserList();
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
      <div>
        <GrantMaintenanceAccessForm handleGrant={this._handleGrant} />
        <MaintenanceAccessUsers users={this.state.users} onRevoke={this._handleRevoke} />
      </div>
    );
  }
}


/*
 * Top-level page
 */
export class AdminPage extends Component {
  render() {
    return (
      <ThinLayout title={_('Administration')}>
        <Section label="Maintenance">
          <MaintenanceStateContainer />
          <MaintenanceAccessContainer />
        </Section>
      </ThinLayout>
    )
  }
}
