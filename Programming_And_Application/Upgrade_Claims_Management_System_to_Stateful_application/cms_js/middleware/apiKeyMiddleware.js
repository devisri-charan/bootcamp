const dotenv = require("dotenv")
dotenv.config()
const validAPIKeys = [process.env.API_KEY1, process.env.API_KEY2]

const apiKeyMiddleware = (req,res,next) => {
    const apiKey = req.header('x-api-key');
    console.log("Received API Key:", apiKey);
    console.log("Valid API Keys:", validAPIKeys);

    if (!apiKey || !validAPIKeys.includes(apiKey)){
        return res.status(403).json({message: "Forbidden - Invalid API Key"})
    }
    next();
}

module.exports = apiKeyMiddleware