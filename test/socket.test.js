const { createServer } = require('http')
const { Server } = require("socket.io")
const Client = require("socket.io-client")

describe("Testing Socket.io", () => {
    let io, serverSocket, clientSocket;
    beforeAll(done => {
        const httpServer = createServer()
        io = new Server(httpServer)
        httpServer.listen(() => {
            const port = httpServer.address().port
            clientSocket = new Client(`http://localhost:${port}`)
            
            io.on("connection", socket => {
                serverSocket = socket
            })

            clientSocket.on("connect", done)
        })
    })

    test("test event", (done) => {
        const msgExpected = "hello"
        clientSocket.on("greeting", greet => {
            try {
                expect(greet).toBe(msgExpected)
                done()
            } catch (error) {
                done(error)
            }
        })
        serverSocket.emit("greeting", msgExpected)
    })

    test("testing callbacks (acknowledgements)", done => {
        serverSocket.on("bark", callback => {
            callback("woof!")
        })
        clientSocket.emit("bark", arg => {
            try {
                expect(arg).toBe("woof!")
                done()
            } catch (error) {
                done(error)
            }
        })
    })

    afterAll(() => {
        io.close()
        clientSocket.close()
    })
})
