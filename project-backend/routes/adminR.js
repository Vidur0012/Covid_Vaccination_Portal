import express from 'express';
import { adminLogin,adminAdd} from '../controllers/adminC.js';
const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/adminAdd").post(adminAdd);

export default router;
