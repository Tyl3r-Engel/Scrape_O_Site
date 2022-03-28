const express = require('express')
const path = require('path')
const { scrape } = require('./controller/scrapers')
const { login, createNewUser } = require('./controller/login')
const { getHistory, addHistory } = require('./controller/history')
require('../dataBase/index')

const app = express();
app.use('/', express.static(path.join(__dirname, '../client/dist')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/',scrape)
app.post('/login',login)
app.post('/createUser',createNewUser)
app.get('/history',getHistory)
app.post('/history',addHistory)
app.listen(3000, () => console.log('server running'))