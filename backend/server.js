// initialization of independent modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Livre = require('./model/livre');

app.use(cors());
// middleware
app.use(express.json());

// configuration
const port = process.env.PT;
const Username = process.env.UN;
const Password = process.env.PW;

// connect to MongoDB
mongoose.connect(`mongodb+srv://${Username}:${Password}@bio.vkpf1.mongodb.net/`)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));}).catch(err => console.log(err));


// roue 
app.get('/livres',async (req, res) => {
    try {
        const livres = await Livre.find();
        res.json({
            length: livres.length,
            Data: livres
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post('/livre',(req, res) => {
    if(!req.body.auteur || !req.body.titre || !req.body.description || !req.body.genre || !req.body.annee_publication){
        res.status(400).send('Bad request');
        return;
    }
    const livre = new Livre({
        auteur: req.body.auteur,
        titre: req.body.titre,
        description: req.body.description,
        genre: req.body.genre,
        annee_publication: req.body.annee_publication,
    });
    livre.save().then(() => {
        res.json('Livre ajoute avec succes');
    }).catch(err => {
        res.status(500).json('Error'+ err);
    })
});

app.get('/livre/:id',async (req, res) => {
    const id = req.params.id;
    try {
        const livre = await Livre.findById(id);
        res.json(livre);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/livre/:id',async (req, res) => {
    const id = req.params.id;
    try {
       await Livre.deleteOne({ _id: id });
        res.json('Livre supprime avec succes');
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/livre/:id',async (req, res) => {
    const id = req.params.id;
    try {
        await Livre.updateOne({ _id: id }, { $set: req.body });
        res.json("Livre modifie avec succes")
    } catch (error) {
        res.status(500).json(error);
    }
});



















// const Username = "mrmarouanefarrah";
// const Password = "f9'vSNwGr@bDkhwBvنتg";