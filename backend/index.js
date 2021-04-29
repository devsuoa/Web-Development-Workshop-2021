import { createServer } from 'http'
import socket from 'socket.io'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001
const server = createServer(app)
const io = socket(server, {
    cors: { origin: '*' },
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const generateRandomCode = () => {
    return Math.random().toString(36).substring(7)
}
app.post('/create', (req, res) => {
    // TODO: POST create a new lobby
})

app.post('/:code', (req, res) => {
    // TODO: POST selection to lobby
})

app.get('/:code', (req, res) => {
    // TODO: GET result from lobby
})

server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
