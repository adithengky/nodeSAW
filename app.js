const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 7777;

app.post('/getRecomendation', controller.getRecomendation);

app.listen(port, () => {
	console.log('server runing on port ' + port);
});