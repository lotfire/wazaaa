import createLogger from 'morgan'
import express from 'express'
import Path from 'path'

import 'colors'

import entriesController from './controllers/entries'
import mainController from './controllers/main'

const app = express()
const publicPath = Path.resolve(__dirname, '../public')

app.set('views', Path.resolve(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(publicPath))

if (app.get('env') !== 'test') {
  app.use(createLogger(app.get('env') === 'development' ? 'dev' : 'combined'))
}

app.locals.title = 'Wazaaa'

if (app.get('env') === 'development') {
  app.locals.pretty = true
}

app.use((req, res, next) => {
  res.locals.flash = []
  res.locals.query = req.query
  res.locals.url = req.url
  next()
})

app.use(mainController)
app.use('/entries', entriesController)

export default app
