const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema(
    {
        userId: { type: String },
        username: { type: String},
        date: { type: String},
        duration: { type: String},
        description: { type: String}
    },
    {
        timestamps: true,
        collection: 'user_exercises'
    }
)

const ExerciseModel = mongoose.model('ExerciseModel', exerciseSchema);

module.exports = ExerciseModel;