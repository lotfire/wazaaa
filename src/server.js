import { createServer } from 'http'
import app from './app'
import attachWebSockets from './controllers/web-sockets'
import dbConnect from './models/connection'

dbConnect(() => {
  console.log('✔ Connection established to mongoDB database'.green)

  app.set('port', process.env.PORT || 3000)

  const server = createServer(app)
  attachWebSockets(server)
  server.listen(app.get('port'), () => {
    console.log('✔ Server listening on port'.green, String(app.get('port')).cyan)
  })
})
