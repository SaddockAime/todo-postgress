// import { Dialect, Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// export class SequelizeConnection {
//   private static instance: Sequelize;
  
//   private constructor() {
//     const dbName = process.env.DB_NAME as string;
//     const dbUser = process.env.DB_USER as string;
//     const dbHost = process.env.DB_HOST;
//     const dbDriver = process.env.DB_DRIVER as Dialect;
//     const dbPassword = process.env.DB_PASSWORD;
 
//     SequelizeConnection.instance = new Sequelize(dbName, dbUser, dbPassword, {
//       host: dbHost,
//       dialect: dbDriver,
//     });
//     SequelizeConnection.instance.authenticate().then(() => {
//       console.log("Sequelize connected");
//     });
//   }
  
//   public static getInstance(): Sequelize {
//     if (!SequelizeConnection.instance) {
//       new SequelizeConnection();
//     }
//     return SequelizeConnection.instance;
//   }
// }


import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import * as dbConnection from '../config/config';

const db: any = {};
let sequelize: Sequelize;
const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
const config: any = dbConnection[env as keyof typeof dbConnection];

if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config.database!, config.username!, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
    })
    .forEach((file: string) => {
        const modelPath = path.join(__dirname, file);
        const model = require(modelPath)(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
