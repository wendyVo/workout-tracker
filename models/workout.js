const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter a name for workout"
        },
        duration: {
            type: Number,
            required: "Enter the duration of the exercise in minutes"
        },
        distance: {
            type: Number,
            required: "Enter the distance for the cardio exercise"
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
    }]
});
workoutSchema.virtual("totalDuration").get(function() {
    let totalDuration = 0;
    this.exercises.forEach(exercise => {
        totalDuration += exercise.duration;
    });
    return totalDuration;
});

// Since virtuals are not included by default when passing a document to Express' res.json() function, the toJSON schema option needs to be set to { virtuals: true }.
workoutSchema.set('toJSON', { virtuals: true });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;