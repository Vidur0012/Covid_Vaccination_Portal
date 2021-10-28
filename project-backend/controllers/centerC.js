import Center from "../models/centerM.js";

export const getCenters = async (req, res) => {
    try {
        const Dist = req.body.dist;
        const State = req.body.state;
        const centers = await Center.find({ district: Dist, state: State });
        
        if (centers.length != 0) {
            res.json({ stat: true, centers: centers });
        }
        else {
            res.json({ stat: false, centers: centers });
        }
    }
    catch (err) {
        res.json({wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}


export const addCenter = async (req, res) => {
    try {
        const { center_number } = req.body;
        const alreadyCenter = await Center.findOne({ center_number: center_number });
        if (alreadyCenter) {
            res.json({ stat: false, message: "Center already exist." });
        }
        else {
            const result = await Center.create(req.body);
            res.json({ stat: true, message: "Center added sucessfully." });
        }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}


export const removeCenter = async (req, res) => {
    try {
        const { center_id } = req.body;
        const resp = await Center.deleteOne({ _id: center_id });
        if (resp.deletedCount == 1) {
            res.json({ stat: true, message: "Deleted SucessFully." });
        }
        else {
            res.json({ stat: false, message: "Deletion went wrong." });
        }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}


export const updateCenter = async (req, res) => {
    try {
        const {_id, ...remain } = req.body;
        const resp = await Center.findByIdAndUpdate(_id, remain);
        if (resp) {
            res.json({ stat: true, message: "Center sucessfully updated." });
        }
        else {
            res.json({ stat: false, message: "Center updation went wrong." });
        }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}


export const centerLogin = async (req, res) => {
    try {

        const { center_num, center_pass } = req.body;
        const center = await Center.findOne({ center_number: center_num, center_pass: center_pass });
        if (center) {
            res.json({ stat: true, message: "Center Logged in Sucessfully.", center: center });
        }
        else {
            res.json({ stat: false, message: "Invalid credentials, Center not found !" });
        }

    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const getCentersAdm = async (req, res) => {
    try {
        const centers = await Center.find({});
        
        if (centers.length != 0) {
            res.json({ stat: true, centers: centers });
        }
        else {
            res.json({ stat: false, centers: centers });
        }
    }
    catch (err) {
        res.json({wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const getCenterById = async (req, res) => {
    try {
        const center = await Center.findById(req.params.id);
        if (center) {
            res.json({ stat: true, center: center });
        }
        else {
            res.json({ stat: false});
        }
    }
    catch (err) {
        res.json({wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}