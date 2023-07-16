import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, minLength: 6, maxLength: 64, required: true },
        username: { type: String, minLength: 4, maxLength: 14, required: true },
        password: { type: String, minLength: 6, maxLength: 64, required: true },
        points: { type: Number, default: 0, min: 0 },
        previousMessages: { type: [mongoose.SchemaTypes.ObjectId] },
        avatarConfig: { type: Object, required: true },
        isBanned: { type: Boolean, default: false },
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
