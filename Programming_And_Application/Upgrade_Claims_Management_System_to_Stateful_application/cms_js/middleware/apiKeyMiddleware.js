const dotenv = require("dotenv")
dotenv.config()
const validAPIKeys = [process.env.API_KEY1, process.env.API_KEY2]

const apiKeyMiddleware = (req,res,next) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey || !validAPIKeys.includes(apiKey)){
        return res.status(403).json({message: "Forbidden - Invalid API Key"})
    }
    next();
}

module.exports = apiKeyMiddleware