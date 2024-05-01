import jwt from 'jsonwebtoken'
import config from '../config/dev.js';

const authenticateJWT = (req, res, next) =>  {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const tokenParts = token.split(' ');

        if(tokenParts.length!==2 || tokenParts[0]!=='Bearer'){
            return res.status(401).json({message:'Invalid Authorization header format'})
        }

        const jwtToken = tokenParts[1]; 
        console.log('jwtToken'); 
        console.log(jwtToken)

        const payload = jwt.verify(jwtToken, config.jwt.SECRET_KEY);
        console.log('payload', payload.username)
        req.username = payload.username; 
        req.user_id = payload.user_id
        console.log(req.username);
        next();

    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default authenticateJWT;