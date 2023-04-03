const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const akbScheme = new Schema({
    maker: String,
    type: String,
    amp_hours: Number,
    volt: Number,
    price: Number}, 
    {versionKey: false});

const Akb = mongoose.model("Akb", akbScheme);

app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb+srv://root:root@mycluster.iykjnvt.mongodb.net/test")
.then(() => 
{
    app.listen(3000, function(){
        console.log("Server is successfully connected to Mongo DB...");
        console.log(__dirname);
    });
}).catch((err) => console.log(err));

 
app.get("/api/akbs", function(req, res){
    Akb.find({}).then(function(akbs){
        res.json(akbs)
    }).catch((err) => console.log(err));
});

app.get("/api/akbs/:id", function(req, res){
    const id = req.params.id;
    const collection = req.app.locals.collection;
    Akb.findOne({_id: id}).then(function(akb){
        res.send(akb);
    }).catch((err) => console.log(err));
});
   
app.post("/api/akbs", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const akbMaker = req.body.maker;
    const akbType = req.body.type;
    const akbAmpHours = req.body.amp_hours;
    const akbVolt = req.body.volt;
    const akbPrice = req.body.price;

    const newAkb = new Akb({maker: akbMaker, type: akbType, amp_hours: akbAmpHours, volt: akbVolt, price: akbPrice});

    newAkb.save().then(function(){
        res.send(newAkb);
    }).catch((err) => console.log(err));
});
    
app.delete("/api/akbs/:id", function(req, res){
        
    const id = req.params.id;
    
    Akb.findByIdAndDelete(id).then(function(akb){    
        res.json(akb);
    }).catch((err) => console.log(err));
});
   
app.put("/api/akbs", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const akbMaker = req.body.maker;
    const akbType = req.body.type;
    const akbAmpHours = req.body.amp_hours;
    const akbVolt = req.body.volt;
    const akbPrice = req.body.price;

    const newAkb = {maker: akbMaker, type: akbType, amp_hours: akbAmpHours, volt: akbVolt, price: akbPrice};
       
    Akb.findOneAndUpdate({_id: id}, newAkb, {new: true}).then(function(akb){   
        res.send(akb);
    }).catch((err) => console.log(err));
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
