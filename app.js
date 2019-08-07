const express = require('express');
const mongoose = require('mongoose');

const indexrouting = require('./index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/',indexrouting);
let uri = 'mongodb+srv://johnnithin08:nithinjohn1@cluster0-juafa.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri,{useNewUrlParser: true},()=>{
    console.log("Connected");
})
app.listen(3000,() => {
    console.log('server up at 3000');
})
