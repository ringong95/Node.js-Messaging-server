const net = require('net')
const server = net.createServer()
server.on('connection', handleConnection)
const connections = []
server.listen(9000, function () {
  console.log('server listening to %j', server.address())
})

function handleConnection (socket) {

  connections.push(socket)

  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`
  console.log(`new client connection from ${remoteAddress}`)
  console.log(socket.data)
  socket.setEncoding('utf8')

  socket.on('data', (data) => {
    connections.forEach((connection) => connection.write(` ${remoteAddress} says :${data}`))
    // socket.write(`${remoteAddress} says: ${data} `)
  })
  socket.on('close', () => {
    console.log(`Closing connection from:${remoteAddress}`)
    // Todo rmeove connection from array on leave
  })
  socket.on('error', (error) => {
    console.log(`${remoteAddress} error, ${error}`)
  })
}
