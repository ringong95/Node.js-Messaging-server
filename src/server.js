const net = require('net')
const server = net.createServer()
server.on('connection', handleConnection)
server.listen(9000, function () {
  console.log('server listening to %j', server.address())
})

function handleConnection (socket) {
  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`new client connection from ${remoteAddress}`)
  console.log(socket.data)
  socket.setEncoding('utf8')

  socket.on('data', (data) => {
    socket.write(`Echo, you fuck nuts sent: ${data} `)
  })
  socket.on('close', () => {
    console.log(`Closing connection from:${remoteAddress}`)
  })
  socket.on('error', (error) => {
    console.log(`${remoteAddress} error, ${error}`)
  })
}
