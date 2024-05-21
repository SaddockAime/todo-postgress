import express from 'express';

import todoUserRoute from './todoUserRoutes';
import todomessageRoute from './todoMessageRoutes';

const router = express.Router();

router.use("/todousers", todoUserRoute);
router.use("/todomessage", todomessageRoute);

export default router;