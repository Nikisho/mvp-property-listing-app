const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");

//MIDDLEWARE
app.use(cors());
app.use(express.json())

/*-----ROUTES-----*/

//-----POST A LISTING----//
app.post("/listed_properties", async (req, res) => {
    try {
        const { description } = req.body;
        const { price_pcm } = req.body;
        const { address } = req.body;
        const { image_url } = req.body;
        const { number_of_bedrooms } = req.body;
        const { number_of_bathrooms } = req.body;
        const { firestore_uid } = req.body;
        const { pm_firebase_uid } = req.body;

        const new_listing = await pool.query("INSERT INTO listed_properties (description, price_pcm, address, image_url, number_of_bedrooms, number_of_bathrooms, firestore_uid, pm_firebase_uid) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                description,
                price_pcm,
                address,
                image_url,
                number_of_bedrooms,
                number_of_bathrooms,
                firestore_uid,
                pm_firebase_uid

            ]);
        res.json(new_listing.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//------GET PROPERTY ADS-----//
app.get("/listed_properties", async (req, res) => {
    try {
        const all_listing = await pool.query("SELECT * FROM listed_properties");
        res.json(all_listing.rows)
    } catch (error) {
        console.error(error.message);
    }
});

//------GET SPECIFIC DATA-----//
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

//------USER AUTHENTICATION----//
app.post('/users', async (req, res) => {

    try {
        const { name } = req.body;
        const { email } = req.body;
        const { firebase_uid } = req.body;
       
        const new_user = await pool.query("INSERT INTO users (name, email, firebase_uid) VALUES($1, $2, $3) RETURNING *",
            [
                name,
                email,
                firebase_uid,
            ]
        )
        res.json(new_user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

});

//------GET SPECIFIC USER DATA-----//migrated
app.get("/users/:firebase_uid", async (req, res) => {
    try {
        const { firebase_uid } = req.params;
        const listing = await pool.query("SELECT * FROM users WHERE firebase_uid = $1",
            [firebase_uid]);
        res.json(listing.rows[0])
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listining on port ${port}.`)
});
/*-----ROUTES-----*/