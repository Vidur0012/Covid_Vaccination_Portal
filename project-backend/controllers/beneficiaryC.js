
import Beneficiary from "../models/BeneficiaryM.js";
import Center from "../models/centerM.js";


export const d1Beneficiary = async (req, res) => {
    try {
        const { name, age, gender, verified_id_num, mobile_num, center_num } = req.body;
        const center = await Center.findOne({ center_number: center_num });
        const avail = center.available_slots_d1 - 1;
        const turn_num = center.total_slots_d1 - avail;
        const register_date = center.date;

        const alreadyBeneficiary = await Beneficiary.findOne({ verified_id_num: verified_id_num });
        if (!alreadyBeneficiary) {
            const resp = await Beneficiary.create({ name: name, age: age, gender: gender, verified_id_num: verified_id_num, mobile_num: mobile_num, turn_num: turn_num, date_d1: register_date, center_num_d1: center_num });

            //decrement available slot for dose1
            const respC = await Center.findByIdAndUpdate(center._id, { available_slots_d1: avail });

            res.json({ stat: true, message: "Beneficiery Sucessfully Registered for Dose-1.", resp: resp });
        }
        else if (alreadyBeneficiary.status_d1 == false && alreadyBeneficiary.date_d1 != register_date) {
            const resp = await Beneficiary.findByIdAndUpdate(alreadyBeneficiary._id, { mobile_num: mobile_num, turn_num: turn_num, date_d1: register_date, center_num_d1: center_num }, { new: true });

            //decrement available slot for dose1
            const respC = await Center.findByIdAndUpdate(center._id, { available_slots_d1: avail });
            res.json({ stat: true, message: "Beneficiery Sucessfully Registered for Dose-1.", resp: resp });
        }
        else {
            res.json({ stat: false, message: "Your verified id number is already used for Dose-1." });
        }
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" })
        console.log(err.message)
    }

}

export const d2Beneficiary = async (req, res) => {
    try {
        const { verified_id_num, center_num, mobile_num } = req.body;
        const d2_beneficiary = await Beneficiary.findOne({ verified_id_num: verified_id_num });

        const center = await Center.findOne({ center_number: center_num });
        const avail = center.available_slots_d2 - 1;
        const turn_num = center.total_slots_d2 - avail;
        const register_date = center.date;
        const vaccine = center.vaccine;

        if (!d2_beneficiary) {
            res.json({ stat: false, message: "You didn't got Dose-1 or entered verified id number is incorrect." })
        }
        else if (d2_beneficiary.status_d1 == false) {
            res.json({ stat: false, message: "You didn't got Dose-1." })
        }
        else if (d2_beneficiary.status_d2 || d2_beneficiary.date_d2 == register_date) {
            res.json({ stat: false, message: "Your verified id number is already used for Dose-2." });
        }
        else if (d2_beneficiary.vaccine !== vaccine) {
            res.json({ stat: false, message: "Your requested vaccine is diffrent than of Dose1." });
        }
        else {
            //decrement available slot for dose2
            const respC = await Center.findByIdAndUpdate(center._id, { available_slots_d2: avail });

            const resp = await Beneficiary.findByIdAndUpdate(d2_beneficiary._id, { mobile_num: mobile_num, turn_num: turn_num, date_d2: register_date, center_num_d2: center_num }, { new: true });

            res.json({ stat: true, message: "Your slot is registered successfully for Dose-2.", resp: resp });
        }
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" })
        console.log(err.message)
    }
}

export const updateBeneficiary = async (req, res) => {
    try {
        const { b_id, ...remain } = req.body;
        const resp = await Beneficiary.findByIdAndUpdate(b_id, remain);
        res.json({ stat: true, message: "Beneficiary sucessfully updated." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" })
        console.log(err.message)
    }
}

export const getBeneficiaries = async (req, res) => {
    try {
        const { center_num, cur_date, dose_num } = req.body;
        if (dose_num == 1) {
            const beneficiaries = await Beneficiary.find({ center_num_d1: center_num, date_d1: cur_date}).sort('turn_num');
            if (beneficiaries.length == 0) {
                res.json({ stat: false, message: "No beneficiaries found." });
            }
            else {
                res.json({ stat: true, beneficiaries: beneficiaries });
            }
        }
        else {
            const beneficiaries = await Beneficiary.find({ center_num_d2: center_num, date_d2: cur_date, status_d1: true }).sort('turn_num');
            if (beneficiaries.length == 0) {
                res.json({ stat: false, message: "No beneficiaries found." });
            }
            else {
                res.json({ stat: true, beneficiaries: beneficiaries });
            }

        }
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" })
        console.log(err.message)
    }
}
