module.exports = (sequelize, DataType) => {
  const compatibilitiesTable = sequelize.define('compatibilities', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fkProductId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fkCarId: {
      type: DataType.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['fkProductId', 'fkCarId'],
      },
    ],

  });

  compatibilitiesTable.associate = (models) => {
    compatibilitiesTable.belongsTo(models.products, 
      { foreignKey: { name: 'fkProductId', allowNull: false }, foreignKeyConstraint: true}
    );
  }

  return compatibilitiesTable;
};