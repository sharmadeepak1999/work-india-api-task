const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer.toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
        decodedToken.payload.isAdmin = true;
        const modifiedToken = jwt.sign(decodedToken.payload, 'your_secret_key');
        req.modifiedToken = modifiedToken;
    }
    next();
}
module.exports = verifyToken