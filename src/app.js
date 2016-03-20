import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import createLogger from 'morgan'
import csrfProtect from 'csurf'
import express from 'express'
import flash from 'connect-flash'
import mongoose from 'mongoose'
import Path from 'path'

mongoose.Promise = Promise

import 'colors'

import entriesController from './controllers/entries'
import mainController from './controllers/main'
import populateHelpers from './common/helpers'

const app = express()
const publicPath = Path.resolve(__dirname, '../public')

app.set('views', Path.resolve(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))

if (app.get('env') !== 'test') {
  app.use(createLogger(app.get('env') === 'development' ? 'dev' : 'combined'))
}

app.use(cookieSession({ name: 'wazaaa:session', secret: 'Node.js c’est de la balle !' }))
app.use(csrfProtect())
app.use(flash())

app.locals.title = 'Wazaaa'
populateHelpers(app.locals)

if (app.get('env') === 'development') {
  app.locals.pretty = true
}

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  res.locals.flash = req.flash()
  res.locals.query = req.query
  res.locals.url = req.url
  next()
})

app.use(mainController)
app.use('/entries', entriesController)

export default app