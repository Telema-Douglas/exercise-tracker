const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String }
    },
    {
        timestamps: true
    },
)

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;