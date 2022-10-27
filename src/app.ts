//import express from "express";
import { Request, Response, Application } from 'express';
import expresslayout from "express-ejs-layouts";
import fileUpload from 'express-fileupload';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import path, { dirname } from 'path';


var express = require('express');

var app: Application = express();

var port: string | number = process.env.PORT ||  3000;

require(`dotenv`).config();

app.use(express.urlencoded( {extended : true} ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expresslayout);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set(`layout`,`./layouts/main`);
app.set(`views`, path.join(__dirname, 'view' )) // set views folder
app.set(`view engine`, `ejs`);

import router from "./server/routes/recipeRoutes"
app.use(`/`,router);

app.listen(port, ()=> console.log(`Listening to port ${port}`));


