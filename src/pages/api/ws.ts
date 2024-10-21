import { NextApiRequest, NextApiResponse } from 'next'
import { Server as NetServer } from 'http'
import { Socket as NetSocket } from 'net'
import { Server as SocketIOServer } from 'socket.io'

export const config = {
    api: {
        bodyParser: false,
    },
}

interface SocketServer extends NetServer {
    io?: SocketIOServer | undefined
}

interface SocketWithIO extends NetSocket {
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        console.log('Initializing Socket.io server...')

        const io = new SocketIOServer(res.socket.server as any, {
            path: '/api/ws',
            addTrailingSlash: false,
            cors: {
                origin: '*',
            },
        })

        io.on('connection', (socket) => {
            console.log('Client connected')

            socket.on('message', (data) => {
                io.emit('message', data)
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })

        res.socket.server.io = io
    }

    res.end()
}

export default ioHandler