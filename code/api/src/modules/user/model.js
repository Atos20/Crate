'use strict'
// Will likely need to add a few additional fields for a user here. A user will have preferences, when they fill out a survey, we will need to save to their profile, so when they log in later they can see products that are tailored or recommended for them. We will also need to somehow check to see if they have taken the survey already, so they don't get prompted to take it every time they sign in.

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