// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(
//     queryInterface: {
//       createTable: (
//         arg0: string,
//         arg1: {
//           id: {
//             allowNull: boolean;
//             autoIncrement: boolean;
//             primaryKey: boolean;
//             type: number;
//           };
//           username: { type: string };
//           email: { type: string };
//           password: { type: string };
//           createdAt: { allowNull: boolean; type: Date };
//           updatedAt: { allowNull: boolean; type: Date };
//         }
//       ) => any;
//     },
//     Sequelize: { INTEGER: number; STRING: string; DATE: Date }
//   ) {
//     await queryInterface.createTable("Users", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       username: {
//         type: Sequelize.STRING,
//       },
//       email: {
//         type: Sequelize.STRING,
//       },
//       password: {
//         type: Sequelize.STRING,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   async down(
//     queryInterface: { dropTable: (arg0: string) => any },
//     Sequelize: any
//   ) {
//     await queryInterface.dropTable("Users");
//   },
// };


import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
