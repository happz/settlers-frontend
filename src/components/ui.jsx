import React, { Component, PropTypes } from 'react';
import { _ } from '../localize.js';
import { InputField } from './forms/InputField.jsx';


export class Username extends Component {
  static propTypes = {
    default: PropTypes.string,
    autocomplete: PropTypes.bool,
  }

  static defaultProps = {
    default: 'Player name',
    autocomplete: false
  }

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  getUsername() {
    return this.state.username;
  }

  render() {
    return (
      <InputField value={this.state.username} default={this.props.default} onChange={this.handleChange} />
    );
  }
}


export class FormRow extends Component {
  static propTypes = {
    label: PropTypes.string
  }

  render() {
    return (
      <div className="pure-control-group">
        <label>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}

export class FinalFormRow extends Component {
  static propTypes = {
    label: PropTypes.string
  }

  render() {
    return (
      <div className="pure-controls">
        { this.props.label && <label>{this.props.label}</label> }
        {this.props.children}
      </div>
    );
  }
}


export class Form extends Component {
  static propTypes = {
    legend: PropTypes.string
  }

  render() {
    return (
      <form className="pure-form pure-form-aligned">
        <fieldset>
          { this.props.legend && <legend>{this.props.legend}</legend> }
          { this.props.children }
        </fieldset>
      </form>
    );
  }
}


export class Section extends Component {
  render() {
    return (
      <section>
        <h3 className="section-head">{this.props.label}</h3>
        {this.props.children}
      </section>
    );
  }
}


export class PageHeader extends Component {
  render() {
    if (this.props.title === null)
      return null;

    return (
      <div>
        <h1 className="page-head">{this.props.title}</h1>
      </div>
    );
  }
}


export class ThinLayout extends Component {
  render() {
    return (
      <div className="page-content">
        { this.props.title && <PageHeader title={this.props.title} /> }
        <div className="content">
          <div className="pure-g">
            <div className="pure-u-1-3" />
            <div className="pure-u-1-3">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export class FullLayout extends Component {
  render() {
    return (
      <div className="page-content">
        { this.props.title && <PageHeader title={this.props.title} /> }
        <div className="content">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
