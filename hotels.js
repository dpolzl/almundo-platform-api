import mongoose from 'mongoose'

export var hotelsSchema = new mongoose.Schema({
    filename : String,
    originalName : String,
    name : String,
    stars : Number,
    price : Number,
    created: { type: Date, default: Date.now }
});
 
export const Hotels = mongoose.model('Hotels', hotelsSchema);
