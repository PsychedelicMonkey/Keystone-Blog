const { Text } = require('@keystonejs/fields');

const category = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
  },
};

module.exports = category;
