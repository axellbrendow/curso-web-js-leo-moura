const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;

consign()
    // As middlewares.js exports a function, consign passes the app object to it
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
