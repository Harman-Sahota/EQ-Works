const { response } = require("express")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const {Client} = require('pg')
const express = require("express")
const chance = require("chance").Chance()
const app = express();
const ioredis = require('ioredis');
const path = require('path');
const fetch = require('node-fetch');
const { RedisClient } = require("redis")


app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'rate-limiter.html'));
})

app.post('/api1',async(req,res)=>{

 const ip = (req.headers['x-forwarded-for']||req.connection.remoteAddress).slice(0,9)
  console.log(ip)
    const requests = RedisClient.increase(ip);
    
    return res.json({
        response: 'ok',
        callsInAMinute: requests
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


const client = new Client({
  user:'readonly',
  password: 'w2UIO@#bg532!',
  port: 5432,
  database: 'work_samples',
  host: 'work-samples-db.cx4wctygygyq.us-east-1.rds.amazonaws.com'
}) 

app.use(express.static("public"));


app.get('/data', async(req, res) =>{
  const rows = await readPOI();
  res.setHeader("Content-Type","application/json")
  res.send(rows);
  })

  
app.get('/chart-data', async(req, res) =>{
  const chart = await readStats();
  res.setHeader("Content-Type","application/json")
  res.send(chart);
  console.log(chart);
  })


app.listen(8080, () => console.log("Web server is listening on port 8080"))

start()
async function start(){
await connect();
const poi = await readPOI();

}

async function connect(){
try{
  await client.connect();
  console.log("success!")
}
catch(e){
  console.error('Failed to connect' + e);
}
}

async function readPOI(){
  try{
  const results = await client.query("SELECT poi_id,name,lat,lon from poi");

  const data ={
     headers: ["poi_id","name","lat","lon"],
    rows: results.rows,
    };
  return data
  }
  catch(e){
    return [];
  }
}

async function readStats(){
  try{
  const results = await client.query("SELECT * from hourly_events");
  const data ={
     headers: ["date","hour","events","poi_id"],
    rows: results.rows,
    };
  return data
  }
  catch(e){
    return [];
  }
}
readStats();





/*client.connect()
.then(() => console.log('Connected Successfully!'))
.then(() => client.query("SELECT * from poi"))
.then(results => results.rows)
.catch(e => console.log(e))*/
/*.finally(() => client.end())*/
/*console.table(results.rows)*/
