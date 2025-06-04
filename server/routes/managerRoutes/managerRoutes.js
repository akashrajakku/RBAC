import express from "express";
import { addManager , editManager, deleteManager, getManager} from "../../controllers/managerController.js";
const router = express.Router();

router.post('/add', addManager);
router.patch('/edit/:id', editManager);
router.delete('/delete/:id', deleteManager);
router.get('/', getManager);

export default router;