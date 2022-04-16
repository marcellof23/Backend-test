const express = require('express');
const db = require('./models/index');

var pino = require('express-pino-logger')();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(require('./api'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DANS Multipro Backend Test app.' });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server Started on PORT ', PORT);
});

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});
