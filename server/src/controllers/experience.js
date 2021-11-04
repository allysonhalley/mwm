import express from 'express';
import mongoose from 'mongoose';

import Experience from '../models/experience.js';
import Wine from '../models/wine.js';

const router = express.Router();

export const getExperiences = async (req, res) => { 
    
    try {
        const experiences = await Experience.find({ user: req.userId });
        
        res.status(200).json(experiences);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getMyExperiences = async (req, res) => {
    // const { id }= req.params;    
    // // const id = "617dc77d42ef2a58984eaba1";
    // try {
    //     const experiences = await Experience.find({ user: id });
    //     console.log(experiences);
    //     res.status(200).json(experiences);
    // } catch (error) {
    //     res.status(404).json({ message: error.message });
    // }
// }

export const getExperience = async (req, res) => { 
    const { id } = req.params;

    try {
        const experience = await Experience.findById(id);
        
        res.status(200).json(experience);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createExperience = async (req, res) => {
    // const { bottle, title, description, wine, user, tags, selectedFile } = req.body;
    // const { description, wine, name, winery, color, sugar, graps,  } = req.body;
    const wine = req.body;
    const { description, tags, selectedFile } = req.body;
    
    try {
        const newWine = await Wine.create({ ...wine, user: req.userId })
        const newExperience = await Experience.create({
            title: `${wine.name} ${wine.color} ${wine.sugar}`,
            bottle: `${wine.winery} ${wine.graps}`,
            description: description,
            wine: newWine.id,
            user: wine.user,
            tags: tags,
            selectedFile: selectedFile
        });

        res.status(201).json(newExperience );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateExperience = async (req, res) => {
    // const { id } = req.params;
    // const { title, description, user, selectedFile, tags } = req.body;
    const wine = req.body;
    const { description, tags, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Experience with id: ${id}`);

    const newExperience = new Experience({
        title: `${name} ${color} ${sugar}`,
        botle: `${winery} ${graps}`,
        description: description,
        wine: req.wineId,
        user: req.userId,
        tags: tags,
        selectedFile: selectedFile
    });
    
    const updatedExperience = { title, description, wine, user, tags, selectedFile, _id: id };

    await Experience.findByIdAndUpdate(id, updatedExperience, { new: true });

    res.json(updatedExperience);
}

export const deleteExperience = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Experience with id: ${id}`);

    await Experience.findByIdAndRemove(id);

    res.json({ message: "Experience deleted successfully." });
}


export default router;