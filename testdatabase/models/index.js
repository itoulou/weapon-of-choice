'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const envConfigs = require('../config/config');
const config = require('config')

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = envConfigs[env];
// const config = envConfigs.test
const db = {};


let sequelize;
sequelize = new Sequelize(`postgres://${config.db.username}:${config.db.password}@${config.db.host}:5432/${config.db.database}`);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user') (sequelize, DataTypes);
db.playlists = require('./playlist') (sequelize, DataTypes);
db.tracks = require('./track') (sequelize, DataTypes);

db.users.hasMany(db.playlists, {as: 'playlists', foreignKey: 'User_userId', onDelete: 'CASCADE'});
db.playlists.belongsTo(db.users, {foreignKey: 'User_userId'})
db.playlists.hasMany(db.tracks, {as: 'tracks', foreignKey: 'Playlist_playlistId', onDelete: 'CASCADE'});
db.tracks.belongsTo(db.playlists, {foreignKey: 'Playlist_playlistId'})

module.exports = db;