import express from 'express';
import {d1Beneficiary,d2Beneficiary,updateBeneficiary,getBeneficiaries} from '../controllers/beneficiaryC.js';

const router = express.Router();

router.route("/d1Beneficiary").post(d1Beneficiary);
router.route("/d2Beneficiary").post(d2Beneficiary);
router.route("/updateBeneficiary").post(updateBeneficiary);
router.route("/getBeneficiaries").post(getBeneficiaries);

export default router;