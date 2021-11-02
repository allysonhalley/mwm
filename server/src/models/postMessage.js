import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    wine: { type: String, required: true },
    user: { type: String, required: true },
    tags: { type: [String], default: [] },
    selectedFile: { type: String },    
},
{timestamps: true},
)

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;