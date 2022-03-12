const express = require('express')
const app = express()
const path = require("path")
const ejs = require("ejs");
const cookieParser = require('cookie-parser')

// ejs config
// const template_path = path.join(__dirname, "../templates/views")
// const parials_path = path.join(__dirname, "../templates/partials")

// app.set("views", template_path)
// ejs.registerPartials(parials_path)
app.set("view engine", "ejs");

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path))


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(port, () => {
  console.log(`server is running at port no. ${port}`);
})