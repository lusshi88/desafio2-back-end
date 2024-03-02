const express = require('express')
const productsRoutes = require('./routes/products.js')
const cartRoutes = require('./routes/carts.js')
const viewsRoutes = require('./routes/views.js')
const handlebars = require('express-handlebars')
const path = require('path')
const httpServer = require('http')
const displayRoutes = require('express-routemap')

// MONGODB --------------------------------
const mongoose = require('mongoose')
mongoose
  .connect('mongodb+srv://ecommerce88:UWfDP0RRKUB5Oofa@cluster88.gxgjzbs.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'ecommerce',
  })
  .then((conn) => {
    console.log('CONNECTED TO MONGODB ')
  })
  .catch((err) => {
    console.log('ERROR CONNECTING TO DB', err)
  })

// puerto del server --------------------------------
const PORT = 8080

const app = express()

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json())

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const API_PREFIX = 'api'

// archivo estatico
app.use(`/static`, express.static(`public`))

app.use(`/${API_PREFIX}/products`, productsRoutes)
app.use(`/${API_PREFIX}/carts`, cartRoutes)
app.use(`/${API_PREFIX}/views`, viewsRoutes)

// Codigo para iniciar el server ----------------
app.listen(PORT, () => {
  displayRoutes(app)
  console.log('Server en funcionamiento')
})

app.get('/'),
  (req, res) => {
    res.render('index.js')
  }

module.exports = {
  httpServer,
}
