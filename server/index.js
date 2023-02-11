const express = require('express');
const axios = require('axios');
const {lose} = require('./database');

const app = express();

// test
app.get('/hello', (req, res) => {
  res.send('hello world');
})

// login
app.get('login', async (req, res) => {

})

app.listen('3060', () => {
  console.log('server running...');
})