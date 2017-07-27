const express = require('express')
const path = require('path')
const fs = require('fs')

let app = express()
// ------- config nunjucks ---------
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autuescape: true,
  cache: false,
  express: app,
  watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')
// --------- body parser -----------
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// app.use de su dung cac file css, img, js
app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname), 'views')


// ------ multer upload ------
const multer = require('multer')
//app.upload = multer({ dest: 'uploads/' })



app.upload = multer({storage: storage, fileFilter: fileFilter})

//  ---------------------------------

let items = [{ title: "foo", id: 1, src:'/public/img/1.jpeg' }, { title: "bar", id: 2, src:'/public/img/2.jpeg'}];
// let logger = (req, res, next) => {
//   console.log('Logging');
//   next()
// }
// app.use(logger)
let datas = require('./data.json')
// console.log(datas);

app.get('/', (req, res) => {
  res.render('home', {data: datas})
})
app.get('/name/:adress', (req, res) => {
  res.send(req.params.adress
   + 'sdf' + req.path + '---' + req.query) 
  
})



app.get('/contact', (req, res) => {
  console.log(app.mountpath);
  res.render('contact')
  
})
app.get('/product', (req, res) => {
  res.render('detail')
  
})

app.post('/product', (req, res) => {
 // console.log(req.body.name);
  let name = req.body.product
  // console.log(req.body.product);
  let data = ''
  datas.forEach((item) => {
    if(item.name === name ){
       data = item
    }
  })

  if(data){
    res.render('detail', {data1: data})
  }else{
    res.render('404')
  }
})

// app.param('id', 133)
app.get('/contact/:id', (req, res) => {
  res.send('request send: '+ req.params.id)
})
	app.get('/upload', (req, res) => {
		res.render('upload')
	})

	app.post('/upload', app.upload.single('photo'), function (req, res, next) {
		// req.file is the `avatar` file
		// req.body will hold the text fields, if there were any
		console.log(req.file);
		console.log(req.body);
		res.send('Upload success');
	})

app.listen(4000, err =>{
  console.log('start port 4000');
})