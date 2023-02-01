const { Sequelize, DataTypes } = require('sequelize');
const config = require('config');

logging = false
const sequelize = new Sequelize(`postgres://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`, {dialect: 'postgres', logging: logging});

sequelize.authenticate().then(() => {
    console.log(`Database connected to ${sequelize.config.database}`);
}).catch((err) => {
    console.log(err);
});

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user') (sequelize, DataTypes);
db.playlists = require('./playlist') (sequelize, DataTypes);
db.tracks = require('./track') (sequelize, DataTypes);

db.users.hasMany(db.playlists, {as: 'playlists', foreignKey: 'User_userId', onDelete: 'CASCADE'});
db.playlists.belongsTo(db.users, {foreignKey: 'User_userId'})
db.playlists.hasMany(db.tracks, {as: 'tracks', foreignKey: 'Playlist_playlistId', onDelete: 'CASCADE'});
db.tracks.belongsTo(db.playlists, {foreignKey: 'Playlist_playlistId'})

module.exports = db;