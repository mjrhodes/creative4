const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let schedules = {};

app.get('/api/employees', (req, res) => {
    res.send(schedules);
});

app.post('/api/employees', (req, res) => {
    schedules[req.body.name] = req.body.list;
    res.send(schedules);
});

app.delete('/api/employees', (req, res) => {
    schedules = {};
    res.sendStatus(200);
});

app.listen(3014, () => console.log('Server listening on port 3014!'))
