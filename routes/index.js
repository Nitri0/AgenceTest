let express = require('express');
let router = express.Router();
let http = require("axios");
//redis-server
let cache = require('express-redis-cache')({ client: require('redis').createClient() })



const TOKEN = "b8d7ffa6fec3ba873e1cd3551aa64df7dbd4dc4f"

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/get-data', function(req, res, next) {
  let city = req.body.city || null;
  cache.get( city , (err, ress)=>{
    if (ress.length){
      let data = JSON.parse(ress[0].body)


      let hourQuery = new Date(data.data.time.s).getHours()
      let hourNow = new Date().getHours()

      // verirficacion 
      if(hourQuery == hourNow){ 
        return res.status(200).send(data)
      }
    }

    http.get( `http://api.waqi.info/feed/${city}/?token=${TOKEN}`)
        .then((response)=>{
          if (response.data.status == "ok"){
            response.data.data.time.s = new Date()
            cache.add( city , JSON.stringify(response.data) , (err, entry)=>{
              if (!err){ console.log("guardando por add");return res.status(200).send(response.data) }
                else{console.log("error al hacer add"); return res.status(404).send(err) }
            })
          }else{
            return res.status(404).send(response.data)
          }
        })
  })
});

module.exports = router;
