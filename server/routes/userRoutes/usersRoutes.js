import express from "express";
import { addUsers , getUsers, userLogin, userSignup} from "../../controllers/usersController.js";

const router = express.Router();

router.post('/auth', addUsers);
router.get('/auth', getUsers);
router.post('/auth/login', userLogin);
router.post('/auth/signup', userSignup);

export default router;