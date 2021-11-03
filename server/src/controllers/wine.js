import express from 'express';
import mongoose from 'mongoose';

import Wine from '../models/wine.js';

const router = express.Router();

export const getWines = async (req, res) => { 
    try {
        const wines = await Wine.find();
                
        res.status(200).json(wines);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getWine = async (req, res) => { 
    const { id } = req.params;

    try {
        const wine = await Wine.findById(id);
        
        res.status(200).json(wine);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createWine = async (req, res) => {
    const wine = req.body;

    const newWine = new Wine({ ...wine, user: req.userId })

    try {
        await newWine.save();

        res.status(201).json(newWine );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateWine = async (req, res) => {
    const { id } = req.params;
    const { name, winery, color, sugar, graps, user, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Wine with id: ${id}`);

    const updatedWine = { name, winery, color, sugar, graps, user, selectedFile, _id: id };

    await Wine.findByIdAndUpdate(id, updatedWine, { new: true });

    res.json(updatedWine);
}

export const deleteWine = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Wine with id: ${id}`);

    await Wine.findByIdAndRemove(id);

    res.json({ message: "Wine deleted successfully." });
}


export default router;