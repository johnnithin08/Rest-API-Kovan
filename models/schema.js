const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const TxList = new Schema({
    Address : {
        type: String,
        required: true
    },
    From : [{
        type : Number,
        required: true
    }],
    To : [{

        type : String,
        required: true
    }],
    Blocknumber: [{
        type: Number,
        required: true
    }],
    Transactionhash: [{
        type: String,
        required : true
    }]
})


module.exports = mongoose.model('txlist',TxList)
