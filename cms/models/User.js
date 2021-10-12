const { Text, Checkbox, Password } = require('@keystonejs/fields');

const user = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    email: {
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    password: {
      type: Password,
      isRequired: true,
    },
    admin: {
      type: Checkbox,
      isRequired: true,
    },
  },
};

module.exports = user;
