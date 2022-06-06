const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mbdb:281002@cluster0.da9el.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err)
    db = client.db('crud-nodejs')

    app.listen(3000, function(){
        console.log('server running on port 3000')
    })
})


app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

app.get('/', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('index.ejs')
})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Salvo com sucesso')
        res.redirect("/")
    })
    
})