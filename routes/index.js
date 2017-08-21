let express = require('express');
let router = express.Router();
let http = require("axios");
//redis-server
//let cache = require('redis').createClient();

const TOKEN = "b8d7ffa6fec3ba873e1cd3551aa64df7dbd4dc4f"

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/get-data', function(req, res, next) {
  //let input = req.post('country')
  let city = req.body.city || null;
  //cache.get( city , (reply, err)=>{
  //    if (reply){
  //          if(util.isActiveData(reply.time)){ // hacer funcion
  //            return res.status(200).send(response.data)
  //          }
  //    }
  //    
    
    let now = new Date()


    http.get( `http://api.waqi.info/feed/${city}/?token=${TOKEN}`)
        .then((response)=>{
          if (response.data.status == "ok"){
            //cache.set( city , response.data , (reply, err)=>{
            // if (!err){ return res.status(200).send(reply) }
            //  else{ return res.status(404).send(err) }
            //})
            return res.status(200).send(response.data);
          }else{
            return res.status(404).send(response.data)
          }
        })
  //})
});

module.exports = router;
