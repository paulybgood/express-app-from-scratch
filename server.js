
const port = process.env.port || 4000;
const express = require('express');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
    database: "familypets",
});

app.use(express.json());
app.use(express.static('public'));


//======================================= Start of GET Request for Owners ================================
// Get all owner information
app.get('/api/owners', (req, res) => {
    pool.query('SELECT * FROM owners', (err, result) => {
        if (result.rows === undefined) {
            res.status(404)
                .setHeader('Content-Type', 'text/plain')
                .end('Owner not found');
        } else {
            res.send(result.rows);
        }
    });
});

// Get owner information by their ID
app.get('/api/owners/:id', (req, res) => {
    let ownerID = req.params.id;
    pool.query('SELECT * FROM owners WHERE id = $1', [ownerID], (err, result) => {
        if (result.rows[0] === undefined) {
            res.status(404)
                .setHeader('Content-Type', 'text/plain')
                .end('Owner not found');
        } else {
            res.send(result.rows[0]);
        }
    });
});
//======================================== End of GET Request for Owners ==================================

//======================================== Start of GET Request for Pets ==================================
// Get all pet information
app.get('/api/pets', (req, res) => {
    pool.query('SELECT * FROM pets', (err, result) => {
        if (result.rows === undefined) {
            res.status(404)
                .setHeader('Content-Type', 'text/plain')
                .end('Owner not found');
        } else {
            res.send(result.rows);
        }
    });
});

// Get pet information by their ID
app.get('/api/pets/:id', (req, res) => {
    let petID = req.params.id;
    pool.query('SELECT * FROM pets WHERE id = $1', [petID], (err, result) => {
        if (result.rows[0] === undefined) {
            res.status(404)
                .setHeader('Content-Type', 'text/plain')
                .end('Owner not found');
        } else {
            res.send(result.rows[0]);
        }
    });
});
//======================================== End of GET Request for Pets ====================================





//======================================= Start of POST Request for Owners ================================
// Create and add new owner information to the owners table of the familypets database
app.post('/api/owners', (req,res) => {
    const { first_name, last_name } = req.body;
    pool.query(
            "INSERT INTO owners(first_name, last_name) VALUES($1, $2) RETURNING *", [
                first_name, last_name,
            ], (err, result) => {
                res.status(201)
                res.json(result.rows[0]);
            }
    );
});

//======================================= End of POST Request for Owners ================================

//======================================= Start of POST Request for Pets ================================
// Create and add new pet information to the pets table of the familypets database
app.post('/api/pets', (req,res) => {
    const { name, kind, age, owner_id } = req.body;
    pool.query(
            "INSERT INTO pets(name, kind, age, owner_id) VALUES($1, $2, $3, $4) RETURNING *", [
                name, kind, age, owner_id
            ], (err, result) => {
                res.status(201)
                res.json(result.rows[0]);
            }
    );
});

//======================================= End of POST Request for Pets ===================================





//======================================= Start of PATCH Request for Owners ==============================
// Updating owner information by id
app.patch('/api/owners/:id', (req,res) => {
    const { first_name, last_name } = req.body;
    const { id } = req.params;
    const query = `
        UPDATE owners SET
            first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name)
        WHERE id = $3
        RETURNING *
    `;
    pool.query(query, [first_name, last_name, id], (err, result) => {
        res.status(200)
            .send(result.rows[0]);
    });
})
//======================================= End of PATCH Request for Owners ================================

//======================================= Start of PATCH Request for Pets ================================
// Updating pet information by id
app.patch('/api/pets/:id', (req,res) => {
    const { name, kind, age } = req.body;
    const { id } = req.params;
    const query = `
        UPDATE pets SET
            name = COALESCE($1, name),
            kind = COALESCE($2, kind),
            age = COALESCE($3, age)
        WHERE id = $4
        RETURNING *
    `;
    pool.query(query, [name, kind, age, id], (err, result) => {
        res.status(200)
            .send(result.rows[0]);
    });
})
//======================================= End of PATCH Request for Pets ==================================






//======================================= Start of DELETE Request for Owners ================================
// Deletes owner information by id
app.delete('/api/owners/:id', (req,res) => {
    const ownerID = req.params.id;
    pool.query('DELETE FROM owners WHERE id = $1 RETURNING *', [ownerID], (err, result) => {
        if(err || result.rowCount === 0) {
            res.status(400)
                .setHeader("Content-Type", "text/plain")
                .end("Could not delete. No owners exist with that ID");
        } else {
            res.json(result.rows[0]);
        }
    });
});
//======================================= End of DELETE Request for Owners ==================================

//======================================= Start of DELETE Request for Pets ==================================
// Deletes pet information by id
app.delete('/api/pets/:id', (req,res) => {
    const petID = req.params.id;
    pool.query('DELETE FROM pets WHERE id = $1 RETURNING *', [petID], (err, result) => {
        if(err || result.rowCount === 0) {
            res.status(400)
                .setHeader("Content-Type", "text/plain")
                .end("Could not delete. No pets exist with that ID");
        } else {
            res.json(result.rows[0]);
        }
    });
});
//======================================= End of DELETE Request for Pets ==================================

app.listen(port);