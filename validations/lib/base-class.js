Function.prototype.inherits = function(base) {
  var _constructor = this;
  _constructor = base.apply(_constructor);
};

Object.defineProperty(Array.prototype, 'nodupush', {
  enumerable: false,
  configurable: true,
  value: function(val) {
    if (!_.include(this, val)) this.push(val);
  }
});

function getProto(value) {
  return Object.prototype.toString.call(value);
}

function isObject(value) {
return getProto(value) === '[object Object]';
}

function isFunction(value) {
  return getProto(value) === '[object Function]';
}

function isUndefined(value) {
  return value === undefined;
}

angular
  .module('BaseClass', ['ng'])
  .provider('Validations', [function() {
    this.$get = [function() {
      function Validations() {
        var validations       = {};
        var builtInValidators = {
          required: required,
          email: email,
          regex: regex,
          format: {
            type: formatType,
            regex: regex
          }
        };

        function formatType(format) {
          return builtInValidators[format];
        };

        function regex(reg) {
          return function regex(instance, value, options) {
            if (value === undefined || value === '' || value === null) return true;
            return reg.test(value);
          }
        };

        required.message = function() {
          return 'is required';
        };

        email.message = function() {
          return 'is not a valid email';
        };

        regex.message = function() {
          return 'is not the correct format';
        };

        function required(instance, value, options) {
          if (value === undefined || value === null) return false;
          if (value.constructor.name == 'String') {
            return !!(value && value.length || typeof value == 'object');
          }
          return value !== undefined;
        };

        function email(instance, value, options) {
          if (value === undefined || value === '' || value === null) return true;
          return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
        };

        this.validates = function(validations) {
          addValidations(validations);
        };

        this.validate = function(fieldName) {
          var instance   = this;
          var toValidate = [];
          if (fieldName) toValidate.push(fieldName);
          else toValidate = Object.keys(validations);

          _.each(toValidate, function(fieldName) {
            _.each(validations[fieldName], function(validation) {
              if (!validation(instance, instance[fieldName], validation.options)) {
                addErrorForField(instance, fieldName, validation);
              };
            });
          });

          return !!(!Object.keys(instance.$errors).length);
        };

        function addErrorForField(instance, fieldName, validation) {
          var message;
          if (!instance.$errors[fieldName]) instance.$errors[fieldName] = [];
          if (!validation.options.message) message = getDefaultErrorMessage(validation);
          else message = validation.options.message;
          instance.$errors[fieldName].nodupush(message);
        };

        function getDefaultErrorMessage(validation) {
          if (builtInValidators[validation.name]) return builtInValidators[validation.name].message();
          return "Is invalid";
        };

        function addValidations(validations) {
          _.each(validations, function(validators, attributeName) {
            addValidationsForAttribute(attributeName, validators);
          });
        };

        function addValidationsForAttribute(attributeName, validators) {
          _.each(validators, function(options, validationName) {
            if (isBuiltInValidator(validationName)) {
              addBuiltInValidation(attributeName, validationName, options);
            } else {
              addCustomValidation(attributeName, validationName, options);
            }
          });
        };

        function addBuiltInValidation(attributeName, validationName, options) {
          addValidationsArrayFor(attributeName);
          var validation = builtInValidators[validationName];
          if (!isFunction(validation)) {
            _.each(options, function(value, key) {
              if (validation[key]) validation = validation[key](value);
            });
          }
          addGenericValidation(attributeName, validation, options);
        };

        function addCustomValidation(attributeName, validationName, options) {
          addValidationsArrayFor(attributeName);
          var validation;
          if (isFunction(options)) validation = options;
          else validation = options.validator;
          validation = customValidation(validation);
          addGenericValidation(attributeName, validation, options);
        };

        function customValidation(validation) {
          return function custom(instance, value, options) {
            if (value === undefined || value === '' || value === null) return true;
            return validation(instance, value, options);
          }
        };

        function addGenericValidation(attributeName, validation, options) {
          validation.options = options;
          validations[attributeName].push(validation);
        };

        function addValidationsArrayFor(attributeName) {
          if (!validations[attributeName]) validations[attributeName] = [];
        };

        function isBuiltInValidator(validationName) {
          return !!(builtInValidators[validationName]);
        };
      };

      return Validations;
    }];
  }])
  .provider('BaseClass', [function() {
    this.$get = ['Validations', function(Validations) {

      function BaseClass() {
        var _constructor = this;
        var _proto       = _constructor.prototype;
        var validations  = new Validations();

        _constructor.new = function(attributes) {
          var instance      = new _constructor(attributes);
          instance.validate = validations.validate;
          instance.$errors  = {};
          return instance;
        };

        _proto.validates = validations.validates;
        _proto.validate  = validations.validate;

        Object.defineProperty(_proto, '$valid', {
          enumerable: false,
          get: function() {
            return this.validate();
          }
        });
      };

      return BaseClass;
    }];
  }]);
