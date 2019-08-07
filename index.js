const web3 = require('web3');
const request = require('request');
const express = require('express');
const mongoose = require('mongoose')

const Txlist = require('./models/schema')


const router = express.Router();

const Web3 = new web3(new web3.providers.HttpProvider("https://kovan.infura.io/v3/6c6f87a10e12438f8fbb7fc7c762b37c"))

router.post('/txnlist',  async (req,res,next) => {

    // let address = '0x254DB636aF5a759B00cD809E605D513a63704724';

    let address = req.body.address.trim().toString(16)

    console.log("address",address.length)
    if(address.length == 40)
     {
         address = '0x' + address;
         console.log("address",address)
     }
    // let address2 = '0x254DB636aF5a759B00cD809E605D513a63704724'
    let lastBlock = await Web3.eth.getBlock('latest');
    console.log(`${lastBlock.number} last block is that`);
    let startBlock = lastBlock.number-10000;
    console.log(startBlock);
    let url = `http://api-kovan.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${lastBlock.number}&sort=desc`
     request({url,json: true},async (error,{body}) => {
        if(error){
            return res.status(400).json({message: "api failed"})
        }
        else if(body.result == undefined)
         {
             return res.status(401).json({message : "Address not valid"})
         }
        // console.log(body.result.length)
        console.log(body.result);
        // console.log(body.result.length)
        console.log("one",body.result[0])
        console.log("hash",body.result[0].blockHash)
        console.log("from",body.result[0].from)
        let from = [],to = [],blocknumber = [],txhash = [];
        for(let i=0;i<body.result.length;i++)
         {
            from.push(body.result[i].from);
            to.push(body.result[i].to);
            blocknumber.push(body.result[i].blockNumber);
            txhash.push(body.result[i].hash);
         }
        
        const txlist = new Txlist
            ({ 

                Address : address,
                From : from,
                To : to,
                Blocknumber : blocknumber,
                Transactionhash:txhash
            });
        let db = await txlist.save();
        console.log("db",db)
        
        let fetchdata = await Txlist.findOne({ Address : '0xb9885A46Fd84546EE5aefC0B07323f730EeCB015'})
        console.log("data",fetchdata.From)
        res.status(201).json({data:fetchdata.From})
        

     });
    
})



module.exports = router;