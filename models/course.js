const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    courseSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    maxStudents: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative number of students"]
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model("Course", courseSchema);