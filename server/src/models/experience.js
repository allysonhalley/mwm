import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
    title: { type: String, required: true },
    bottle: { type: String, required: true },
    description: { type: String, required: true },
    wine: { type: String, required: true },
    user: { type: String, required: true },
    tags: { type: [String], default: [] },
    selectedFile: { type: String },    
},
{timestamps: true},
)

var Experience = mongoose.model('Experience', experienceSchema);

export default Experience;