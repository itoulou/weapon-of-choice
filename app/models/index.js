const { Sequelize, DataTypes } = require('sequelize');
const config = require('config');

logging = false
let sequelize;
console.log("ENV=> ", config.util.getEnv('NODE_ENV'));
console.log("DB_URI=> ", process.env.DB_URI)
if (config.util.getEnv('NODE_ENV') !== 'staging' && config.util.getEnv('NODE_ENV') !== 'prod') {
    sequelize = new Sequelize(`postgres://${config.db.username}:${config.db.password}@${config.db.host}:5432/${config.db.database}`, {dialect: 'postgres', logging: logging});
} else {
    sequelize = new Sequelize(process.env.DB_URI, {dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }, logging: logging});
}

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