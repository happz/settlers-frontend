 const validators = {

  notblank: function(value) {
    return value !== '';
  },

  rangelength: function(value, min = 1, max = 256) {
    return value.length >= min && value.length <= max;
  },

  equals: function(left, right) {
    return left === right;
  },

  email: function(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },

  username: function(value) {
    return validators.notblank(value) && validators.rangelength(value, 2, 256);
  },

  password: function(value) {
    return validators.notblank(value) && validators.rangelength(value, 2, 256);
  },

  oneOf: function(possibleValues) {
    return function(value) {
      for(var i = 0; i < possibleValues.length; i++)
        if (possibleValues[i] === value)
          return true;
      return false;
    }
  }

}

module.exports = {
  validators: validators
};

