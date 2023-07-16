import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
    {
        author: { type: mongoose.SchemaTypes.ObjectId, required: true },
        body: { type: String, minLength: 16, maxLength: 1600, required: true },
        views: { type: Number, min: 0, default: 0 },
        impressions: {
            type: {
                likes: [mongoose.SchemaTypes.ObjectId],
                dislikes: [mongoose.SchemaTypes.ObjectId],
            },
        },
        reports: {
            type: [
                {
                    reportedBy: { type: String, required: true },
                    reason: { type: String, required: true },
                },
            ],
        },
        comments: [
            {
                postedBy: { type: String, required: true },
                body: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);
const Message =
    mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
