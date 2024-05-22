import { DataTypes, Model, Sequelize } from "sequelize";

interface TodoAttributes {
  id: number;
  name: string;
  email: string;
  message: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: Sequelize) => {
class Todos extends Model<TodoAttributes> implements TodoAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare message: string;
  declare user_id: string;
  declare updatedAt: Date;
  declare createdAt: Date;
  
  // Define any static methods or associations here
  static associate(models: any) {
    Todos.belongsTo(models.User, { foreignKey: 'user_id' ,as: 'User' });
}
}
// const sequelizeConnection = SequelizeConnection.getInstance();

Todos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
    name: {
      // field: "name",
      // type: DataTypes.STRING,
      type: new DataTypes.STRING,
      allowNull: false,
    },
    email: {
      // field: "email",
      // type: DataTypes.STRING,
      type: new DataTypes.STRING,
      allowNull: false,
    },
    message: {
      // field: "message",
      // type: DataTypes.STRING,
      type: new DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      // type: new DataTypes.INTEGER,
      // allowNull: false,
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field: "createdAt",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      field: "updatedAt",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Todos",
    modelName: "Todo",
    timestamps: true,
  }
);
return Todos;
// Todo.sync().then();
}





