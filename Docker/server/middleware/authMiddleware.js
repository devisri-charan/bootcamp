const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Policyholder = require('../models/Policyholder')
dotenv.config();

const authMiddleware = async(req,res,next) => {
    const token = req.header('Authorization').replace('Bearer','');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.policyholder = await Policyholder.findOne({policyholder_id: decoded.policyholder_id});
        if (!req.user) return res.status(400).send('Invalid token.');
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

const adminMiddleware = (req,res,next) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    next();
}

module.exports = {authMiddleware, adminMiddleware};