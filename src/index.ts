
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import allRoutes from './routes/allRoutes';
import db from './database/models/index';  // Import your database module

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
dotenv.config();

app.use('/api', allRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to todo app with PostgreSQL');
});

const PORT = process.env.PORT;
const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on Port:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
