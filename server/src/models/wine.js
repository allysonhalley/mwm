import mongoose from "mongoose";

const wineSchema = mongoose.Schema({
    id: { type: String, required: true },
  name: { type: String, required:  true },
  winery: { type: String, required: true },
  color: { type: String, required: true },
  sugar: { type: String, required: true },
  graps: { type: [String], default: [] },
  user: { type: String, required: true },
  selectedFile: { type: String },
});

export default mongoose.model("Wine", wineSchema);