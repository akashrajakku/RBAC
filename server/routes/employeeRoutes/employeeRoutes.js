import express from "express";
import { addEmployee, editEmployee, deleteEmployee, getEmployee} from "../../controllers/employeeController.js";

const router = express.Router();

router.post('/add', addEmployee);
router.patch('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/', getEmployee);

export default router;