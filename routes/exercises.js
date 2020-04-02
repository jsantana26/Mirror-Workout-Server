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

// Index route will return view of all the exercises in the db
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

// Get All route - Returns all the exercises in json format
router
    .route('/getAll')
    .get((req,res) => {
        const result = client.query(`SELECT * FROM exercises
                    LEFT JOIN difficulties
                    ON exercises.difficulty_id=difficulties.id`
        , (err, result) => {
            // Check for error with query
            if(err){
                return console.error('error running query', err);
            }
            console.log(result.rows);
            // Render index view
            res.json(result.rows);
        })
    });

// New Route - Add new exercises to the DB
router
    .route('/new')
    .post((req, res) => {
        client.query("INSERT INTO exercises(name,type,difficulty_id,description,video_path,calories_burned) VALUES ($1,$2,$3,$4,$5,$6)",
        [req.body.name, req.body.type, DifficultyLevel[req.body.difficulty], req.body.description,req.body.video_path, req.body.calories_burned]).catch(err => console.error('Query error', err));
    
        res.redirect('/exercises'); 
    });

// Delete Route - Deletes an exercise from the db
router
    .route('/delete/:id')
    .delete((req, res) => {
        client.query("DELETE FROM exercises WHERE pid = $1", [req.params.id]);

        res.sendStatus(200);
    });

// Edit Route - Updates the values of the exercise
router
    .route('/edit')
    .post((req, res) => {
        client.query("UPDATE exercises SET name=$2,type=$3,difficulty_id=$4,description=$5,video_path=$6,calories_burned=$7 WHERE pid=$1",
        [req.body.id, req.body.name, req.body.type, DifficultyLevel[req.body.difficulty], req.body.description,req.body.video_path, req.body.calories_burned]).catch(err => console.error('Error Updating.', err));

        res.redirect('/exercises');
    });

module.exports = router;