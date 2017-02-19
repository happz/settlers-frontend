import React, { Component, PropTypes } from 'react';
import { Form, FormRow, FinalFormRow } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import SubmitButton from '../components/forms/SubmitButton.jsx';
import { update, mapObject } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';
import { commonUserPropShape, fieldValidStates } from '../proptypes.js';
import store from '../store.js';
import { successMessage, errorMessage } from '../modules/messageBox.js';

class GrantMaintenanceAccessForm extends Component {
  static propTypes = {
    isValid: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    usernameValid: fieldValidStates.isRequired
  }

  render() {
    return (
      <Form legend="Grant maintenance access">
        <FormRow>
          <InputField
            value={this.props.username}
            valid={this.props.usernameValid}
            placeholder='User name'
            onChange={this.props.onUsernameChange}
            required={true} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Grant" onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class GrantMaintenanceAccessFormContainer extends Component {
  static propTypes = {
    onGrant: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      username: InputField.createInitialState('', 'unknown')
    };
  }

  _isValid = () => {
    return this.state.username.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    this.props.onGrant(this.state.username.value, () => {
      this.setState({
        username: InputField.createInitialState('', 'unknown')
      });
    });
  }

  render() {
    return (
      <GrantMaintenanceAccessForm
        username={this.state.username.value}
        usernameValid={this.state.username.valid}
        onUsernameChange={InputField.createChangeHandler(this, 'username', [validators.username])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
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

  _handleRevoke = (user, event) => {
    event.preventDefault();

    this.props.onRevoke(user);
  }

  render() {
    return (
      <div>
        <h4>{_('Users with maintenance access')}</h4>
        <table className="pure-table-horizontal maintenance-access-users">
          <tbody>
            {
              mapObject(this.props.users, (index, user) => {
                return <MaintenanceAccessUser
                         user={user}
                         key={user.name}
                         onRevoke={this._handleRevoke.bind(this, user)} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default class extends Component {
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
        if (payload === null)
          return;

        this.setState({
          users: payload.users
        });
      })
      .catch((error) => {
        store.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  _handleGrant = (username, onSuccess) => {
    update('/admin/maintenance/access/grant', {
      username: username
    })
      .then((payload) => {
        if (payload === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Maintenance access granted.'),
          onClose: () => {
            this._fetchUserList();
            onSuccess();
          }
        }));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  _handleRevoke = (user) => {
    update('/admin/maintenance/access/revoke', {
      username: user.name
    })
      .then((payload) => {
        if (payload === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Maintenance access revoked.'),
          onClose: () => {
            this._fetchUserList();
          }
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
      <div>
        <GrantMaintenanceAccessFormContainer onGrant={this._handleGrant} />
        <MaintenanceAccessUsers users={this.state.users} onRevoke={this._handleRevoke} />
      </div>
    );
  }
}
