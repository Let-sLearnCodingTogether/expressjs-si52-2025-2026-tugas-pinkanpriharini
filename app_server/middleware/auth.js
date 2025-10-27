import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'pinkan123';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token not provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer')
    return res.status(401).json({ message: 'Invalid authorization header format. Use: Bearer <token>' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    // attach user info to req.user so controllers can use it
    req.user = { id: decoded.id || decoded._id, _id: decoded._id || decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
