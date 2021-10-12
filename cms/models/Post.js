const {
  Text,
  Select,
  CalendarDay,
  Relationship,
} = require('@keystonejs/fields');
const { Content } = require('@keystonejs/fields-content');
const { Unsplash } = require('@keystonejs/fields-unsplash');

const post = {
  fields: {
    title: {
      type: Text,
      iaRequired: true,
    },
    body: {
      type: Content,
      blocks: [
        Content.blocks.blockquote,
        Content.blocks.image,
        Content.blocks.link,
        Content.blocks.orderedList,
        Content.blocks.unorderedList,
        Content.blocks.heading,
        [
          Unsplash.blocks.unsplashImage,
          {
            attribution: 'KeystoneJS',
            accessKey: process.env.UNSPLASH_ACCESS_KEY,
            secretKey: process.env.UNSPLASH_SECRET_KEY,
          },
        ],
      ],
      isMultiline: true,
      isRequired: true,
    },
    author: {
      type: Relationship,
      ref: 'User',
      many: false,
      isRequired: true,
    },
    categories: {
      type: Relationship,
      ref: 'Category',
      many: true,
      isRequired: true,
    },
    unsplashCoverImage: {
      type: Unsplash,
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
      secretKey: process.env.UNSPLASH_SECRET_KEY,
    },
    published: {
      type: Select,
      options: [
        { value: 'PUBLISHED', label: 'Published' },
        { value: 'UNPUBLISHED', label: 'Unpublished' },
      ],
      defaultValue: 'PUBLISHED',
      isRequired: true,
    },
    createdAt: {
      type: CalendarDay,
      isRequired: true,
    },
  },
};

module.exports = post;
