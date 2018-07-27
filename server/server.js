
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var bodyParser = require("body-parser"); // Body parser for fetch posted data
Eos = require('eosjs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

wif = "5JhhMGNPsuU42XXjZ57FcDKvbb7KLrehN65tdTQFrH51uruZLHi";
pubkey = "EOS7ckzf4BMgxjgNSYV22rtTXga8R9Z4XWVhYp8TBgnBi2cErJ2hn";

eos = Eos({ keyProvider: wif, chainId:"038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", httpEndpoint: "http://dev.cryptolions.io:18888" });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*
eventEmitter.on('ProductScanned', function(details)
{
    console.log(details);
});
*/

eventEmitter.emit('ProductScanned', ['serial','sku','imagehash','latlong','timestamp']);


app.post('/api/scans', function(req, res) {
    console.log(req.body);
    var latlon = req.body.latlon;
    //var timestamp = req.body.timestamp;
    var imagehash = req.body.imagehash;
    var serial = req.body.serial;
    var sku = req.body.sku;


    eos.transaction({
    actions: [
    {
        account: "gh4",
        name: "newscan",
        authorization: [
        {
            actor: "gh4",
            permission: "active"
        }
        ],
        data: {
        _serial: serial,
        _sku: sku,
        _latlon: latlon,
        _imagehash: imagehash
        }
    }
    ]
}).then((result)=> 

 eos.transaction({
    actions: [
    {
        account: "ghtoken2",
        name: "transfer",
        authorization: [
        {
            actor: "ghtoken2",
            permission: "active"
        }
        ],
        data: {
        from: "ghtoken2",
        to: "ghdev",
        quantity: "10.0000 PPV",
        memo: "memo"
        }
    }
    ]
    }).then(res.send("done"))

);
});


async function i(){
    var s = await eos.getTableRows('true','gh4','gh4','items')
    return s;
}

app.get('/api/products', function(req, res) {
    var fin_result = [];
    eos.getTableRows('true','gh4','gh4','scans',0,0,1000,1000)
    .then((result1)=> {i().then((result2)=>{ 
        var scandata = result1['rows'];
        var itemdata = result2['rows'];
        //console.log(productdata),
        //console.log(itemdata)   
        //var fin_result = []
        for(var i=0;i<itemdata.length;i++){
            var new_fields = { locations : [] }
            for(var j=0;j<scandata.length;j++){
                if(scandata[j].serial==itemdata[i].serial){
                    new_fields.locations.push(scandata[j]);
                    //var res = Object.assign(productdata[i],itemdata[j]);
                    //fin_result.push(res);
                    //console.log(fin_result)
                }
            }
            var res = Object.assign(itemdata[i],new_fields);
            fin_result.push(res);   
        }

        //console.log(fin_result);
        return fin_result

}).then((i)=> {res.send(i)})
    })
});


app.get('/api/products/:productid', function(req, res) {
    var fin_result = [];
    eos.getTableRows('true','gh4','gh4','scans',0,0,1000,1000)
    .then((result1)=> {i().then((result2)=>{ 
        var scandata = result1['rows'];
        var itemdata = result2['rows'];
        //console.log(productdata),
        //console.log(itemdata)   
        //var fin_result = []
        for(var i=0;i<itemdata.length;i++){
            if(itemdata[i].serial==req.params.productid){
            var new_fields = { locations : [] }
            for(var j=0;j<scandata.length;j++){
                if(scandata[j].serial==itemdata[i].serial ){
                    new_fields.locations.push(scandata[j]);
                    //var res = Object.assign(productdata[i],itemdata[j]);
                    //fin_result.push(res);
                    //console.log(fin_result)
                }
            }
        var res = Object.assign(itemdata[i],new_fields);
            fin_result.push(res); 
    }
              
        }

        //console.log(fin_result);
        return fin_result

}).then((i)=> {res.send(i[0])})
    })
});


app.get('/api/transferTokens', function(req, res) {
    eos.transaction({
    actions: [
    {
        account: "ghtoken2",
        name: "transfer",
        authorization: [
        {
            actor: "ghtoken2",
            permission: "active"
        }
        ],
        data: {
        from: "ghtoken2",
        to: "ghdev",
        quantity: "10.0000 PPV",
        memo: "memo"
        }
    }
    ]
    }).then((result)=>{res.send("Transfer Done")},(error)=>{res.send(error)});
});


app.get('/api/getImageUrl', function(req, res) {
   res.send("www.ddf.com")
});


app.post('/api/products', function(req, res) {
    console.log("products")
    console.log(req)
    eos.transaction({
    actions: [
    {
        account: "gh4",
        name: "newitem",
        authorization: [
        {
            actor: "gh4",
            permission: "active"
        }
        ],
        data: {
            _brand: req.body.brand,
            _title: req.body.title,
            _sku: req.body.sku,
            _serial: req.body.serial,
            _mfg_loc: req.body.mfg_loc
        }
    }
    ]
    }).then((result)=> res.status(200).send(result));
});



app.get('/api/balance', function(req, res) {
    eos.getTableRows('true','ghtoken2','ghdev','accounts')
    .then((result) => res.status(200).send(result['rows']),
    (error) => res.status(500).send(error));
});

app.listen(port,function(){
  console.log("Started on heroku PORT ");
})


