const express = require('express')
const app = express()
const path = require("path")
const ejs = require("ejs");
const cookieParser = require('cookie-parser')
const QRCode = require('qrcode')
const Sales = require("./models/sales");

require("./db/conn")

// ejs config
app.set("view engine", "ejs");

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  QRCode.toDataURL("Hello World !")
    .then((url) => {
      res.status(201).render('pages/index', { qrcode: url });
    })
    .catch((err) => {
      res.status(401).render('pages/index', { qrcode: "abhi" });
    });
});

app.get('/bookingDetails/',async function (req, res) {
  saleData = req.query.salesdataId
  console.log(saleData);
  const sale = await Sales.findById({ _id: saleData });
  data = JSON.stringify(sale)
  QRCode.toDataURL(data)
    .then((url) => {
      res.status(201).render('pages/index', { qrcode: url });
    })
    .catch((err) => {
      res.status(401).render('pages/index', { qrcode: "abhi" });
    });
});

app.get('/form', async function (req, res) {
  try {
    res.status(201).render("pages/form");

  } catch (error) {
    res.status(401).send(error)
  }
})

app.post('/form', async function (req, res) {
  try {
    console.log("hello");
    const sale = new Sales({
      name: req.body.name,
      email: req.body.email,
      no_of_persons: req.body.no_of_persons,
      slotTiming: req.body.slotTiming,
      date_of_visit: req.body.date_of_visit,
      contactNo: req.body.contactNo,
      comments: req.body.comments,
      totalPrice: 100
    })
    console.log(sale);
    const register = await sale.save();
    console.log(register);
    // res.status(201).render("pages/form");
    res.redirect(`/bookingDetails/?salesdataId=${register._id}`);
  } catch (error) {
    res.status(401).send(error)
  }
})

app.get('/details', function (req, res) {
  try {
    res.status(201).render('pages/moreDetails');

  } catch (error) {
    res.status(401).send(error)
  }
})


app.listen(port, () => {
  console.log(`server is running at port no. ${port}`);
})