import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export interface ICustomReq extends Request{
    player: JwtPayload
}

function auth (req: Request, res: Response, next: NextFunction){
    const token = req.header('x-auth-token') 
    if(!token) return res.status(401).send('Access denied. No token provided.')

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY ?? "") as JwtPayload
        (req as ICustomReq).player = decoded
        
        next()
    } catch(err) {
        res.status(400).send('Invalid token.')
    }
}

export default auth