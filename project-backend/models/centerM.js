import mongoose from "mongoose";

const centerSchema = new mongoose.Schema(
    {
        center_name: { type: String, required: true },
        center_number: { type: String, unique: true, required: true },
        total_slots_d1: { type: Number, required: true },
        total_slots_d2: { type: Number, required: true },
        available_slots_d1: { type: Number, required: true },
        available_slots_d2: { type: Number, required: true },
        date: { type: String, required: true },
        state: { type: String, required: true },
        district: { type: String, required: true },
        vaccine: { type: String, required: true },
        vaccinator_name: { type: String, required: true },
        center_pass: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        pincode: { type: Number, required: true },
        address: { type: String, required: true },
    }
)

const Center = mongoose.model("Center", centerSchema);
export default Center;