'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    'tracks',
    [
      {
        name: 'track 1',
        trackId: '123456789',
        Playlist_playlistId: '1'
      },
      {
        name: 'track 2',
        trackId: 'qwewqe213',
        Playlist_playlistId: '1'
      },
      {
        name: 'track 3',
        trackId: 'gfgdsg3432432',
        Playlist_playlistId: '1'
      },
      {
        name: 'track 1',
        trackId: '5254235sffs',
        Playlist_playlistId: '2'
      },
      {
        name: 'track 2',
        trackId: 'fgdh5335gfdg',
        Playlist_playlistId: '2'
      },
    ],
    {},
  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tracks', null, {})
  }
};
