import { startWebSocket } from '@/utils/sparkle'
import type { NextApiRequest, NextApiResponse } from 'next'

let isWebSocketRunning = false

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isWebSocketRunning) {
    startWebSocket();
    isWebSocketRunning = true;
  }

  res.status(200).json({ status: 'WebSocket server is running' })
}