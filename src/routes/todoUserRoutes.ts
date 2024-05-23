import express from 'express';
import { authentication } from '../middlewares/authentication';
import { login, signup, viewUsers, disableUser, enableUser } from '../modules/todoUser/controller/todoUserController';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/viewusers", viewUsers);


router.put('/disable/:id', disableUser);
router.put('/enable/:id', enableUser);

export default router;
