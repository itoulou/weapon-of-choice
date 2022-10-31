'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config');
// const envConfigs = require('config')

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
// const config = envConfigs.test
const db = {};


let sequelize;
sequelize = new Sequelize(`postgres://${config.db.username}:${config.db.password}@${config.db.host}:5431/${config.db.database}`);

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

module.exports = db;