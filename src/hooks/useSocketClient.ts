"use client"

import { useEffect, useCallback, useRef } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { io, Socket } from 'socket.io-client'
import { chatMessagesState, socketConnectionState, ChatMessage } from '@/store/atoms/atoms'

export const useSocketClient = () => {
    const socketRef = useRef<Socket | null>(null)
    const setMessages = useSetRecoilState(chatMessagesState)
    const setConnection = useSetRecoilState(socketConnectionState)
    const isConnected = useRecoilValue(socketConnectionState)

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io({
                path: '/api/ws',
                addTrailingSlash: false,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            })

            const socket = socketRef.current

            socket.on('connect', () => {
                console.log('Socket connected!')
                setConnection(true)
            })

            socket.on('disconnect', () => {
                console.log('Socket disconnected!')
                setConnection(false)
            })

            socket.on('message', (message: ChatMessage) => {
                setMessages((prev) => [...prev, message])
            })
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current = null
            }
        }
    }, [setMessages, setConnection])

    const sendMessage = useCallback((text: string) => {
        if (socketRef.current && isConnected) {
            const message: ChatMessage = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                text,
                timestamp: new Date().toISOString(),
                sender: socketRef.current.id
            }
            socketRef.current.emit('message', message)
        }
    }, [isConnected])

    return { sendMessage, isConnected }
}