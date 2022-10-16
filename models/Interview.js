const mongoose = require("mongoose");

const { Schema } = mongoose;

const interview = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        participants: [{
            type: Schema.ObjectId,
            ref: 'User',
        }]

    }
);

const Interview = mongoose.model("Interview", interview);

module.exports = Interview