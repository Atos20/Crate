'use strict'
// Annotations: Possibly modify this file in order to add new category for a user (style preference)
// add a boolean ex... has_taken_survey : true/false. Once it's true, FE won't show the survey option.
// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}