import express from "express";
import { addEmployee, editEmployee, deleteEmployee, getEmployee, getAnEmployee} from "../../controllers/employeeController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";


const router = express.Router();

router.post('/add', authMiddleware([0]), addEmployee);
router.patch('/edit/:id', authMiddleware([0]), editEmployee);
router.delete('/delete/:id', authMiddleware([0]), deleteEmployee);
router.get('/', authMiddleware([0, 1]), getEmployee);
router.get('/fetch', authMiddleware([2]), getAnEmployee);

export default router;