const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({

    titre: { type: String, required: true}, 
    auteur: { type: String , required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    annee_publication: { type: Date, required: true },
    create_at:{ type:Date,default:Date.now() },
});

module.exports = Livre=mongoose.model('Livre', livreSchema);