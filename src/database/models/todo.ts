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
class Todo extends Model<TodoAttributes> implements TodoAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare message: string;
  declare user_id: string;
  declare updatedAt: Date;
  declare createdAt: Date;
  


  // Define any static methods or associations here
  static associate(models: any) {
    Todo.belongsTo(models.User, { foreignKey: 'user_id' ,as: 'User' });
}
}
// const sequelizeConnection = SequelizeConnection.getInstance();

Todo.init(
  {
    id: {
      field: "id",
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: DataTypes.STRING,
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
    },
    message: {
      field: "message",
      type: DataTypes.STRING,
    },
    user_id: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field: "createdAt",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updatedAt",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "Todos",
    // modelName: "Todo",
    timestamps: true,
  }
);
return Todo;
// Todo.sync().then();
}





