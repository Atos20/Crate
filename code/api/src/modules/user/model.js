'use strict'

// User database model

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
    },
    survey: {
      type: DataTypes.BOOLEAN
    },
    style: {
      type: DataTypes.TEXT
<<<<<<< HEAD
    },
=======
    }
>>>>>>> 44732d6138778b204a5f7ced228c5329cbad2ccb
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
