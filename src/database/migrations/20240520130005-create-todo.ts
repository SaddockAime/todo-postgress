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
//           name: { type: string };
//           email: { type: string };
//           message: { type: string };
//           createdAt: { allowNull: boolean; type: Date };
//           updatedAt: { allowNull: boolean; type: Date };
//           user_id: { 
//             type: number;
//             allowNull: boolean;
//           }
//         }
//       ) => any;
//     },
//     Sequelize: { INTEGER: number; STRING: string; DATE: Date }
//   ) {
//     await queryInterface.createTable("Todos", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       name: {
//         type: Sequelize.STRING,
//       },
//       email: {
//         type: Sequelize.STRING,
//       },
//       message: {
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
//       user_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     });
//   },
//   async down(
//     queryInterface: { dropTable: (arg0: string) => any },
//     Sequelize: any
//   ) {
//     await queryInterface.dropTable("Todos");
//   },
// };


import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Todos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      message: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      user_id: {
        type: new DataTypes.INTEGER,
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
    await queryInterface.dropTable('Todos');
  },
};
