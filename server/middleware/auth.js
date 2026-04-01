import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // extract after Bearer

    if (!token) {
        return res.status(401).json({ error: 'No token, access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        console.log(err);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export default verifyToken;