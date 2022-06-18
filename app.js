import express from 'express';
import bodyParser from 'body-parser';
import bodyParserJsonError from 'express-body-parser-json-error';

import exerciseRouter from './handlers.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParserJsonError());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/devexercise/', exerciseRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

