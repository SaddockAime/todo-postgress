import express from 'express';
import { authentication } from '../middlewares/authentication';
import { login, signup, viewUsers } from '../modules/todoUser/controller/todoUserController';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/viewusers", authentication , viewUsers);

export default router;
