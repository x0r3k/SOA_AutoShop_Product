module.exports = (sequelize, DataType) => {
  const categoriesTable = sequelize.define('categories', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    fkCategoryId: {
      type: DataType.INTEGER,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
  });

  categoriesTable.associate = (models) => {
    categoriesTable.hasOne(categoriesTable, { foreignKey: 'id', foreignKeyConstraint: true, useJunctionTable: false} );
  }

  return categoriesTable;
};