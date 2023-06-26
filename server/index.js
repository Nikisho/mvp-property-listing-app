const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json())

////////////////ROUTES//////////////////
// //CREATE
// price_pcm
// address VARCHAR(255),
// number_of_bedrooms int,
// number_of_bathrooms int,
// image_url VARCHAR(255),
// description VARCHAR(255),
app.post("/listed_properties", async (req, res) => {
    try {
        const { description } = req.body;
        const { price_pcm } = req.body;
        const { address } = req.body;
        const { image_url } = req.body;
        const { number_of_bedrooms } = req.body;
        const { number_of_bathrooms } = req.body;
        const { firestore_uid } = req.body;

        const new_listing = await pool.query("INSERT INTO listed_properties (description, price_pcm, address, image_url, number_of_bedrooms, number_of_bathrooms, firestore_uid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                description,
                price_pcm,
                address,
                image_url,
                number_of_bedrooms,
                number_of_bathrooms,
                firestore_uid

            ])
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