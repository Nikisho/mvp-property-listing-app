const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json())

////////////////ROUTES//////////////////
//CREATE
app.post("/listed_properties", async (req, res) => {
    try {
        const { description } = req.body;
        const new_listing = await pool.query("INSERT INTO listed_properties (description) VALUES($1) RETURNING *",
            [description])
        res.json(new_listing.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//GET
app.get("/listed_properties", async (req, res) => {
    try {
        const all_listing = await pool.query("SELECT * FROM listed_properties");
        res.json(all_listing.rows)
    } catch (error) {
        console.error(error.message);
    }
});

//GET SPECIFIC DATA
app.get("/listed_properties/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await pool.query("SELECT * FROM listed_properties WHERE property_id = $1",
            [id]);
        res.json(listing.rows[0])
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(port, () => {
    console.log('Started!')
});
////////////////ROUTES//////////////////