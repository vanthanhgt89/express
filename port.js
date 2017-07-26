const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

let app = express()
// config nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autuescape: true,
  cache: false,
  express: app,
  watch: true
})
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// app.use de su dung cac file css, img, js
app.use('/public', express.static(path.join(__dirname,'public')))
app.engine('html', nunjucks.render)

app.set('views', path.join(__dirname), 'views')
app.set('view engine', 'html')

let items = [{ title: "foo", id: 1, src:'/public/img/1.jpeg' }, { title: "bar", id: 2, src:'/public/img/2.jpeg'}];
// let logger = (req, res, next) => {
//   console.log('Logging');
//   next()
// }
// app.use(logger)
let datas = require('./data.json')
console.log(datas);

app.get('/', (req, res) => {
  res.render('home', {data: datas})
})

app.get('/blog', (req, res) => {
  res.json(person)
  
})
app.post('/blog', (req, res) => {
  console.log(req.body.name);
  res.send(req.body.name)
  
})
app.get('/contact/:id', (req, res) => {
  res.send('request send: '+ req.params.id)
})

app.listen(4000, err =>{
  console.log('start port 4000');
})