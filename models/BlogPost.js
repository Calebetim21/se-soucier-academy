const { DataTypes } = require('sequelize');
const sequelize = require('/Users/user/se-soucier-academy/config/db');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Admin',
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = BlogPost;
