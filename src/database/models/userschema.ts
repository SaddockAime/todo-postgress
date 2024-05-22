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
class Users extends Model<UsersAttributes> implements UsersAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define any static methods or associations here
  static associate(models: any) {
    Users.hasMany(models.Todo, { foreignKey: 'user_id' });
}
}
// const sequelizeConnection = SequelizeConnection.getInstance();

Users.init(
  {
    id: {
      // field: "id",
      primaryKey: true,
      type: DataTypes.INTEGER,
      // allowNull: false,
      autoIncrement: true,
    },
    username: {
      // field: "username",
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
    password: {
      // field: "password",
      // type: DataTypes.STRING,
      type: new DataTypes.STRING,
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
    // sequelize: sequelizeConnection,
    sequelize,
    tableName: "Users",
    modelName: "User",
    timestamps: true,
  }

);
return Users;
// User.sync().then();
}






