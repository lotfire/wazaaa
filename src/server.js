import { createServer } from 'http'
import app from './app'

app.set('port', process.env.PORT || 3000)

const server = createServer(app)
server.listen(app.get('port'), () => {
  console.log('✔ Server listening on port'.green, String(app.get('port')).cyan)
})
