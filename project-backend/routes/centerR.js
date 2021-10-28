import express from 'express';
import { getCenters,addCenter,removeCenter,updateCenter,centerLogin,getCentersAdm, getCenterById } from '../controllers/centerC.js';

const router = express.Router();

router.route("/getCenters").post(getCenters);
router.route("/addCenter").post(addCenter);
router.route("/removeCenter").post(removeCenter);
router.route("/updateCenter").post(updateCenter);
router.route("/centerLogin").post(centerLogin);

router.route("/getCentersAdm").get(getCentersAdm);
router.route("/getCenterById/:id").get(getCenterById);


export default router;