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