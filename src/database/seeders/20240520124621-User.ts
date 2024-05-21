// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: (
//     queryInterface: {
//       bulkInsert: (
//         arg0: string,
//         arg1: {
//           id: number;
//           username: string;
//           email: string;
//           password: string;
//           createdAt: Date;
//           updatedAt: Date;
//         }[]
//       ) => any;
//     },
//     Sequelize: any
//   ) => {
//     // Add multiple authors to database
//     return queryInterface.bulkInsert("Users", [
//       {
//         id: 1,
//         username: "Saddock",
//         email: "Saddock@gmail.com",
//         password: "hello",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: 2,
//         username: "Aime",
//         email: "aime@gmail.com",
//         password: "hello",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   },
//   down: (
//     queryInterface: { bulkDelete: (arg0: string, arg1: null, arg2: {}) => any },
//     Sequelize: any
//   ) => {
//     // Remove all authors from database
//     return queryInterface.bulkDelete("Users", null, {});
//   },
// };

import { QueryInterface  } from 'sequelize'

const userOne = {
  username:'Saddock',
  email:'saddock@gmail.com',
  password:'Saddock2000',
  createdAt: new Date(),
  updatedAt: new Date(),
}
const userTwo = {
  username:'Aime',
  email:'aime@gmail.com',
  password:'Aime2000',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('Users',[userOne, userTwo])

const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('Users',[])
export { up, down }