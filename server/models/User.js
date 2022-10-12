const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        interviews: [{
            type: Schema.ObjectId,
            ref: "Interview"
        }]
    }
);

const User = mongoose.model("User", userSchema)

module.exports = User