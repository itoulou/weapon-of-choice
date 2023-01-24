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
    'playlists',
    [
      {
        name: 'Jane test playlist',
        User_userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon test playlist',
        User_userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('playlists', null, {})
  }
};
