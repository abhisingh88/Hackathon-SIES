const express = require('express')
const app = express()
const path = require("path")
const ejs = require("ejs");
const cookieParser = require('cookie-parser')
const QRCode = require('qrcode')

// ejs config
app.set("view engine", "ejs");

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/', function(req, res) {

  QRCode.toDataURL("Hello World !")
    .then((url) => {
      res.render('pages/index',{qrcode:url});
    })
    .catch((err) => {
      res.render('pages/index',{qrcode:"abhi"});
    }); 
});

app.get('/nav',function(req,res){
  res.render('pages/nav')
})

app.get('/form',function(req,res){
  res.render('pages/form')
})

app.listen(port, () => {
  console.log(`server is running at port no. ${port}`);
})