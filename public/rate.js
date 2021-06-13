const express = require("express");


const app = express();

app.use(express.json());

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'rate-limiter.html'));
})

app.post('/api1',async(req,res)=>{
    return res.json({
        response: 'ok',
        callsInAMinute: 0
    })
})

app.post('/api2',async(req,res)=>{
    return res.json({
        response: 'ok',
        callsInAMinute: 0
    })
})

app.post('/api3',async(req,res)=>{
    return res.json({
        response: 'ok',
        callsInAMinute: 0
    })
})


