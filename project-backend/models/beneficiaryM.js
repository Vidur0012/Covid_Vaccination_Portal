import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        verified_id_num: { type: Number, required:true, unique: true },
        mobile_num: { type: Number, required: true },

        vaccine: { type: String, default: "" },
        turn_num: { type: Number, required: true },

        center_num_d1:{ type: String, default:""},
        status_d1: { type: Boolean, default: false },
        date_d1:{type:String,default:""},

        center_num_d2:{ type: String,default:""},
        status_d2: { type: Boolean, default: false },
        date_d2:{type:String,default:""}

    }
)

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
export default Beneficiary;