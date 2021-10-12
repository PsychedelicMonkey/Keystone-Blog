const dotenv = require('dotenv');
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

dotenv.config();

const Category = require('./models/Category');
const Post = require('./models/Post');
const User = require('./models/User');

const PROJECT_NAME = 'Blog';
const adapterConfig = { mongoUri: process.env.MONGO_URI };

const isAdmin = ({ authentication: { item: user } }) => {
  return !!user && !!user.admin;
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
});

keystone.createList('Category', {
  fields: Category.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
});

keystone.createList('Post', {
  fields: Post.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  adminConfig: {
    defaultColumns: 'author,createdAt',
    defaultSort: '-createdAt',
  },
  labelField: 'title',
});

keystone.createList('User', {
  fields: User.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password',
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: isAdmin,
    }),
  ],
};
