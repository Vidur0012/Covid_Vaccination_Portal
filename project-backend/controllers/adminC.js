import Admin from "../models/AdminM.js";

export const adminLogin = async (req, res) => {
    try {
            const {email,password} = req.body;
            const admin = await Admin.findOne({email:email,password:password});
            if (admin) {
                res.json({ stat: true, message: "Admin Logged in Sucessfully.", admin: admin });
            }
            else {
                res.json({ stat: false, message: "Invalid credentials, Admin not found !" });
            }
    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}

export const adminAdd = async (req, res) => {
    try {
            const {name,email,password} = req.body;
            const alreadyAdmin = await Admin.findOne({email:email});
            if(alreadyAdmin)
            {
                res.json({ stat: false, message: "Provided email-adress is already used." });
            }
            else
            {
                const result = await Admin.create({name:name,email:email,password:password});
                res.json({ stat: true, message: "Admin added sucessfully." });
            }

    }
    catch (err) {
        res.json({ wentWrong : true, message: "Something went wrong !" });
        console.log(err.message);
    }
}