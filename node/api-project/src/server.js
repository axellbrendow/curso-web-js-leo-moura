const port = 3003;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database');

// urlencoded() returns a middleware function that transforms jsons into objects
app.use(bodyParser.urlencoded({ extended: true }));

/* app.get('/products', (req, res, next) => {
    console.log('Middleware 1...');
    // Calling next will make express call the next middleware.
    // In this case, app.get('/products')
    next();
}); */

app.get('/products', (req, res, next) => {
    res.send(database.getProducts());
});

app.get('/products/:id', (req, res, next) => {
    res.send(database.getProduct(req.params.id));
});

app.post('/products', (req, res, next) => {
    const product = database.saveProducts({
        name: req.body.name,
        price: req.body.price,
    });

    res.send(product);
});

app.put('/products/:id', (req, res, next) => {
    const product = database.saveProducts({
        name: req.body.name,
        price: req.body.price,
        id: req.params.id,
    });

    res.send(product);
});

app.delete('/products/:id', (req, res, next) => {
    const product = database.deleteProduct(req.params.id);

    res.send(product);
});

app.listen(port, () => {
    console.log(`Server on port ${port}`)
});
