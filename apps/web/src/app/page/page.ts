// pages/api/get-ip.js 
import {Response, Request} from 'express' 
export default function handler(req: Request, res:Response) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.status(200).json({ ip });
  }
  