import jwt from 'jsonwebtoken';
import db from '../../../../db/db.config.js';
import dotenv from "dotenv";

dotenv.config();

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token);
    if (!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      console.log([decoded.id]);


      const rows = await db.select().from('users').where('id', '=', decoded.id);

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Auth;