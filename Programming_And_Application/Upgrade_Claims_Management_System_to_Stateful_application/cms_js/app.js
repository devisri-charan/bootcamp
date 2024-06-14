const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config();
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log('Could not connect to MongoDB', err))

const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const Policyholder = require("./models/Policyholder");
const Policy = require("./models/Policy");
const Claim = require("./models/Claim");

function isValidDate(dateStr) {
    return !isNaN(new Date(dateStr).getTime());
}

app.get('/', (req, res) => {
    res.send('Welcome to Insurance API');
})

// Create a new policyholder
app.post('/policyholders', async (req, res) => {
    try {
        const policyholder = new Policyholder(req.body);
        await policyholder.save();
        res.status(201).send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve a specific policyholder
app.get('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOne({ policyholder_id: req.params.policyholder_id });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a policyholder
app.put('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOneAndUpdate({ policyholder_id: req.params.policyholder_id }, req.body, { new: true });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a policyholder
app.delete('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOneAndDelete({ policyholder_id: req.params.policyholder_id });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send({ message: 'Policyholder deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new policy
app.post('/policies', async (req, res) => {
    try {
        const policy = new Policy(req.body);
        await policy.save();
        res.status(201).send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve a specific policy
app.get('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOne({ policy_id: req.params.policy_id });
        if (!policy) return res.status(404).send('Policy not found');
        res.send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a policy
app.put('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOneAndUpdate({ policy_id: req.params.policy_id }, req.body, { new: true });
        if (!policy) return res.status(404).send('Policy not found');
        res.send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a policy
app.delete('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOneAndDelete({ policy_id: req.params.policy_id });
        if (!policy) return res.status(404).send('Policy not found');
        res.send({ message: 'Policy deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Create a new claim
app.post('/claims', async (req, res) => {
    try {
        const claim = new Claim(req.body);
        await claim.save();
        res.status(201).send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Retrieve a specific claim
app.get('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOne({ claim_id: req.params.claim_id });
        if (!claim) return res.status(404).send('Claim not found');
        res.send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a claim
app.put('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOneAndUpdate({ claim_id: req.params.claim_id }, req.body, { new: true });
        if (!claim) return res.status(404).send('Claim not found');
        res.send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a claim
app.delete('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOneAndDelete({ claim_id: req.params.claim_id });
        if (!claim) return res.status(404).send('Claim not found');
        res.send({ message: 'Claim deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})