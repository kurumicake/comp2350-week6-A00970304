const express = require('express');
const app = express();
const database = include('databaseConnection');
const router = include('routes/router');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Place these lines before your routes to parse the body of incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Now add your router
app.use('/', router);

// Static files middleware
app.use(express.static(__dirname + "/public"));

async function printMySQLVersion() {
    let sqlQuery = `SHOW VARIABLES LIKE 'version';`;
    try {
        const results = await database.query(sqlQuery);
        console.log("Successfully connected to MySQL");
        console.log(results[0]);
        return true;
    } catch (err) {
        console.log("Error getting version from MySQL", err);
        return false;
    }
}

const success = printMySQLVersion();

app.listen(port, () => {
    console.log("Node application listening on port " + port);
});
