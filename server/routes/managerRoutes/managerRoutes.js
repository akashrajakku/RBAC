import express from "express";
import { addManager , editManager, deleteManager, getManager} from "../../controllers/managerController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post('/add', authMiddleware([0]), addManager);
router.patch('/edit/:id', authMiddleware([0]), editManager);
router.delete('/delete/:id', authMiddleware([0]), deleteManager);
router.get('/', authMiddleware([0]), getManager);

export default router;