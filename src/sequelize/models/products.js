module.exports = (sequelize, DataType) => {
  const productsTable = sequelize.define('products', {
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
    price: {
      type: DataType.FLOAT(8,2),
      allowNull: false,
    },
    discount: {
      type: DataType.FLOAT(5,2),
      allowNull: false,
    },
    amount: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fkCategoryId: {
      type: DataType.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
  });

  productsTable.associate = (models) => {
    productsTable.belongsTo(models.categories, 
      { foreignKey: { name: 'fkCategoryId', allowNull: false }, foreignKeyConstraint: true}
    );

    productsTable.hasMany(models.compatibilities,
      { foreignKey: { name: 'fkProductId', allowNull: false }, foreignKeyConstraint: true }
    );
  }

  return productsTable;
};