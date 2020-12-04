module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // I am a huge fan of user migrations and seeder files to keep both the FE and BE synced for any DB updates
    // add a new column here for details that will be inside of their crate when they subscribe to it
    // this will link to a new DB table that stores the selections from their survey and what they chose as items during that survey to build their first crate
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crates');
  }
}
