// require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    username: 'fatboyslim',
    password: 'wop',
    database: 'weapon_of_choice',
    host: 'postgres',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}
