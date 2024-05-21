import { DataTypes, Model, Sequelize } from "sequelize";
// import { SequelizeConnection } from "./index";

interface UsersAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: Sequelize) => {
class User extends Model<UsersAttributes> implements UsersAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define any static methods or associations here
  static associate(models: any) {
    User.hasMany(models.Todo, { foreignKey: 'user_id' });
}
}
// const sequelizeConnection = SequelizeConnection.getInstance();

User.init(
  {
    id: {
      field: "id",
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      field: "username",
      type: DataTypes.STRING,
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
    },
    password: {
      field: "password",
      type: DataTypes.STRING,
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
    // sequelize: sequelizeConnection,
    sequelize,
    tableName: "Users",
    // modelName: "User",
    timestamps: true,
  }

);
return User;
// User.sync().then();
}






