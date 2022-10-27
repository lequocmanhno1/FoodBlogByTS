import mongoose, { Schema } from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    decription: {
        type: String,
        require: 'This field is required.'
    },
    email: {
        type: String,
        require: 'This field is required.'
    },
    ingredients: {
        type: Array,
        require: 'This field is required.'
    },
    description: {
        type: String,
        require: 'This field is required.'
    },
    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        require: 'This field is required.'
    },
    image: {
        type: String,
        require: 'This field is required.'
    },
});
recipeSchema.index({name : 'text', description : 'text'});

export default mongoose.model('Recipe',recipeSchema);