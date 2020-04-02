// Set up express router
const express = require('express');
const router = express.Router();

// Set up DB connection
const { Client } = require('pg');

//DB Connect string
var connect = "postgres://Mirror:Jeffrey1@localhost/MirrorWorkoutDb"
const client = new Client({
    connectionString: connect,
})
client.connect();

// Enum for difficulties
const DifficultyLevel = {
    Beginner: 1, Intermediate: 2, Advanced: 3, Insane: 4
}

// Index Route
router
    .route('/')
    .get((req, res) => {
        client.query(`SELECT * FROM exercises
                    LEFT JOIN difficulties
                    ON exercises.difficulty_id=difficulties.id`
        , (err, result) => {
            // Check for error with query
            if(err){
                return console.error('error running query', err);
            }
            // Render index view
            res.render('index', {exercises: result.rows});
        })
    });

// Add Route
router
    .route('/add')
    .post((req, res) => {
        client.query("INSERT INTO exercises(name,type,difficulty_id,description,video_path,calories_burned) VALUES ($1,$2,$3,$4,$5,$6)",
        [req.body.name, req.body.type, DifficultyLevel[req.body.difficulty], req.body.description,req.body.video_path, req.body.calories_burned]).catch(err => console.error('Query error', err));
    
        res.redirect('/'); 
    });

// Export Module
module.exports = router;