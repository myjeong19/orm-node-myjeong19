const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Member = require('./member.js')(sequelize, Sequelize);
db.Channel = require('./channel.js')(sequelize, Sequelize);
db.ChannelMember = require('./channelMember.js')(sequelize, Sequelize);
db.ChannelMsg = require('./message.js')(sequelize, Sequelize);

module.exports = db;
