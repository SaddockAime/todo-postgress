import express from 'express';
import { authentication } from '../middlewares/authentication';
import { login, signup, viewUsers, disableUser, enableUser } from '../modules/todoUser/controller/todoUserController';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/viewusers", authentication, viewUsers);


router.put('/disable/:id', authentication, disableUser);
router.put('/enable/:id', authentication, enableUser);

export default router;
