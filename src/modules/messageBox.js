import { _ } from '../localize.js';

export default function reducer(state, action) {
  switch(action.type) {
    case 'MESSAGE-BOX-UPDATE':
      return {
        style: action.style,
        title: action.title,
        text: action.text,
        needsClose: action.needsClose,
        onClose: action.onClose
      };

    default:
      if (!state)
        return {
          style: 'info',
          title: null,
          text: null,
          needsClose: false,
          onClose: null                                                                                                       
        };

      return state;
  }
}

const _createAction = (options = {}) => {
  const defaultOptions = {
    style: 'info',
    title: null,
    text: null,
    needsClose: false,
    onClose: null
  };

  return Object.assign({ type: 'MESSAGE-BOX-UPDATE' }, defaultOptions, options);
}

export function resetMessageBox() {
  return _createAction();
}

export function successMessage(options = {}) {
  const defaultOptions = {
    style: 'success',
    title: null,
    text: null,
    needsClose: true
  };

  options = Object.assign({}, defaultOptions, options);
  options.title = (options.title === null ? _('Success!') : options.title);

  return _createAction(options);
}

export function infoMessage(options = {}) {
  const defaultOptions = {
    style: 'info',
    needsClose: true
  };

  return _createAction(Object.assign({}, defaultOptions, options)); 
}

export function errorMessage(options = {}) {
  const defaultOptions = {
    style: 'error',
    title: null,
    text: null
  };

  options = Object.assign({}, defaultOptions, options);
  options.title = (options.title === null ? _('Error!') : options.title);

  return _createAction(options);
}
