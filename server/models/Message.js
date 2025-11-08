import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, index: true },
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    text: { type: String, required: true },
    meta: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Message", MessageSchema);
