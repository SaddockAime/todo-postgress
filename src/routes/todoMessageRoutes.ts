import express from 'express';
import { authentication } from '../middlewares/authentication';
import { createMessage, viewMessages, deleteMessage } from '../modules/todoMessage/controller/todoMessageController';

const router = express.Router();

router.post("/createMessage", authentication, createMessage);

router.get("/viewMessages", authentication, viewMessages);

router.delete("/deleteMessage/:id", authentication, deleteMessage);

// router.put("/updateMessage/:id", authentication, updateMessage);

export default router;
