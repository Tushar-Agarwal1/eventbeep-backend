const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        req: true,
        trim: true,
    },
    email: {
        type: String,
        req: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        req: true,
        trim: true,

    }
}
)

const User = mongoose.model("User", userSchema);

module.exports = User;

