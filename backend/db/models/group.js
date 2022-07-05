'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.User, {foreignKey: 'organizerId', as: "Organizer"});
      //Group.belongsToMany(models.User, {through: models.UserGroup, as: "Members"});
      Group.hasMany(models.UserGroup, {foreignKey: 'groupId', onDelete: "CASCADE", hooks: true})
      Group.hasMany(models.Image, {foreignKey: 'groupId'})
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,60]
      }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        minlength50(val) {
          if (val.length < 50) throw new Error('About must be 50 characters or more')
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        correctOptions(val) {
          if ( val !== 'Online' && val !== 'In Person') throw new Error('Type must be Online or In person')
        }
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkState(val) {
          const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
          'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
          'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD',
          'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

          if (!states.includes(val)) throw new Error('State must be valid');
        }
      }
    },
    previewImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
