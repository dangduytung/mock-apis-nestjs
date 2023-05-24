import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('url', req.originalUrl);

    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header missing' });
    }

    const [bearer, token] = authHeader.split(' ');
    console.log('token', token);

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).send({ message: 'Invalid token format' });
    }

    try {
      // const decoded = jwt.verify(token, 'your-secret-key');
      // req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }
  }
}
