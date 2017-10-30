"use strict";
import express from 'express';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

export default app;
