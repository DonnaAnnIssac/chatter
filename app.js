const express = require('express')
const config = require('./config')
const pg = require('pg')
const app = express()

let connString = 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name
let pgPool = new pg.Pool({
  connectionString: connString
})

pgPool.connect((err, client) => {
  if (err) console.log('Unable to connect: ' + err)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.use(express.static('public'))
})
app.listen(config.app.port, () => {
  console.log('Listening on port 8000')
})
