'use strict';
module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define('Note', {
    name: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};