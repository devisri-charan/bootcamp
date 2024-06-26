const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setupSwagger = require('./swaggerConfig');

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log('Could not connect to MongoDB', err));

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Policyholder = require("./models/Policyholder");
const Policy = require("./models/Policy");
const Claim = require("./models/Claim");

setupSwagger(app);

app.get('/', (req, res) => {
    res.send('Welcome to Claims Management System API');
});

app.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('date_of_birth').isDate().withMessage('Date of Birth must be a valid date'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, date_of_birth, address, phone, password } = req.body;

        const existingUser = await Policyholder.findOne({ phone });
        if (existingUser) return res.status(400).send('Policyholder already exists.');

        const policyholder_id = uuidv4();  
        const hashedPassword = await bcrypt.hash(password, 16);
        const policyholder = new Policyholder({
            policyholder_id,
            name,
            date_of_birth,
            address,
            phone,
            password: hashedPassword
        });

        await policyholder.save();

        const token = jwt.sign({ policyholder_id: policyholder.policyholder_id }, process.env.JWT_SECRET);
        res.status(201).send({ token, policyholder_id: policyholder.policyholder_id, name: policyholder.name});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const policyholder = await Policyholder.findOne({ phone });
        if (!policyholder) return res.status(400).send('Invalid Phone Number or password.');

        const validPassword = await bcrypt.compare(password, policyholder.password);
        if (!validPassword) return res.status(400).send('Invalid Phone Number or password.');

        const token = jwt.sign({ policyholder_id: policyholder.policyholder_id }, process.env.JWT_SECRET);
        res.status(200).send({ token , policyholder_id: policyholder.policyholder_id, name: policyholder.name});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Policyholder:
 *       type: object
 *       required:
 *         - policyholder_id
 *         - name
 *         - date_of_birth
 *         - address
 *         - phone
 *       properties:
 *         policyholder_id:
 *           type: string
 *           description: The unique ID of the policyholder
 *         name:
 *           type: string
 *           description: The name of the policyholder
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the policyholder
 *         address:
 *           type: string
 *           description: The address of the policyholder
 *         phone:
 *           type: string
 *           description: The phone number of the policyholder
 *       example:
 *         policyholder_id: "1"
 *         name: "John Doe"
 *         date_of_birth: "1980-01-01"
 *         address: "123 Main St"
 *         phone: "555-555-5555"
 */

/**
 * @swagger
 * /policyholders:
 *   post:
 *     summary: Create a new policyholder
 *     tags: [Policyholders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Policyholder'
 *     responses:
 *       201:
 *         description: The policyholder was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policyholder'
 *       400:
 *         description: Bad request
 */
app.post('/policyholders', [
    body('policyholder_id').notEmpty().withMessage('Policyholder ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('date_of_birth').isDate().withMessage('Date of Birth must be a valid date'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const policyholder = new Policyholder(req.body);
        await policyholder.save();
        res.status(201).send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policyholders/{policyholder_id}:
 *   get:
 *     summary: Retrieve a specific policyholder
 *     tags: [Policyholders]
 *     parameters:
 *       - in: path
 *         name: policyholder_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policyholder to retrieve
 *     responses:
 *       200:
 *         description: A policyholder object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policyholder'
 *       404:
 *         description: Policyholder not found
 */
app.get('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOne({ policyholder_id: req.params.policyholder_id });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policyholders/{policyholder_id}:
 *   put:
 *     summary: Update a policyholder
 *     tags: [Policyholders]
 *     parameters:
 *       - in: path
 *         name: policyholder_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policyholder to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Policyholder'
 *     responses:
 *       200:
 *         description: The updated policyholder
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policyholder'
 *       404:
 *         description: Policyholder not found
 */
app.put('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOneAndUpdate({ policyholder_id: req.params.policyholder_id }, req.body, { new: true, runValidators: true });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send(policyholder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policyholders/{policyholder_id}:
 *   delete:
 *     summary: Delete a policyholder
 *     tags: [Policyholders]
 *     parameters:
 *       - in: path
 *         name: policyholder_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policyholder to delete
 *     responses:
 *       200:
 *         description: The policyholder was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Policyholder not found
 */
app.delete('/policyholders/:policyholder_id', async (req, res) => {
    try {
        const policyholder = await Policyholder.findOneAndDelete({ policyholder_id: req.params.policyholder_id });
        if (!policyholder) return res.status(404).send('Policyholder not found');
        res.send({ message: 'Policyholder deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Policy:
 *       type: object
 *       required:
 *         - policy_id
 *         - policyholder_id
 *         - start_date
 *         - end_date
 *         - premium
 *       properties:
 *         policy_id:
 *           type: string
 *           description: The unique ID of the policy
 *         policyholder_id:
 *           type: string
 *           description: The ID of the policyholder
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the policy
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the policy
 *         premium:
 *           type: number
 *           description: The premium amount of the policy
 *       example:
 *         policy_id: "p12345"
 *         policyholder_id: "ph12345"
 *         start_date: "2023-01-01"
 *         end_date: "2024-01-01"
 *         premium: 1000.0
 */

/**
 * @swagger
 * /policies:
 *   post:
 *     summary: Create a new policy
 *     tags: [Policies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Policy'
 *     responses:
 *       201:
 *         description: The policy was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       400:
 *         description: Bad request
 */
app.post('/policies', [
    body('policy_id').notEmpty().withMessage('Policy ID is required'),
    body('policyholder_id').notEmpty().withMessage('Policyholder ID is required'),
    body('start_date').isDate().withMessage('Start Date must be a valid date'),
    body('end_date').isDate().withMessage('End Date must be a valid date'),
    body('premium').isNumeric().withMessage('Premium must be a number')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const policy = new Policy(req.body);
        await policy.save();
        res.status(201).send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policies/{policy_id}:
 *   get:
 *     summary: Retrieve a specific policy
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: policy_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policy to retrieve
 *     responses:
 *       200:
 *         description: A policy object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       404:
 *         description: Policy not found
 */
app.get('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOne({ policy_id: req.params.policy_id });
        if (!policy) return res.status(404).send('Policy not found');
        res.send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policies/{policy_id}:
 *   put:
 *     summary: Update a policy
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: policy_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policy to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Policy'
 *     responses:
 *       200:
 *         description: The updated policy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       404:
 *         description: Policy not found
 */
app.put('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOneAndUpdate({ policy_id: req.params.policy_id }, req.body, { new: true, runValidators: true });
        if (!policy) return res.status(404).send('Policy not found');
        res.send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /policies/{policy_id}:
 *   delete:
 *     summary: Delete a policy
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: policy_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the policy to delete
 *     responses:
 *       200:
 *         description: The policy was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Policy not found
 */
app.delete('/policies/:policy_id', async (req, res) => {
    try {
        const policy = await Policy.findOneAndDelete({ policy_id: req.params.policy_id });
        if (!policy) return res.status(404).send('Policy not found');
        res.send({ message: 'Policy deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Claim:
 *       type: object
 *       required:
 *         - claim_id
 *         - policy_id
 *         - date_of_claim
 *         - claim_amount
 *         - status
 *       properties:
 *         claim_id:
 *           type: string
 *           description: The unique ID of the claim
 *         policy_id:
 *           type: string
 *           description: The ID of the policy
 *         date_of_claim:
 *           type: string
 *           format: date
 *           description: The date of the claim
 *         claim_amount:
 *           type: number
 *           description: The amount of the claim
 *         status:
 *           type: string
 *           description: The status of the claim
 *       example:
 *         claim_id: "c12345"
 *         policy_id: "p12345"
 *         date_of_claim: "2023-06-01"
 *         claim_amount: 5000.0
 *         status: "Pending"
 */

/**
 * @swagger
 * /claims:
 *   post:
 *     summary: Create a new claim
 *     tags: [Claims]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Claim'
 *     responses:
 *       201:
 *         description: The claim was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       400:
 *         description: Bad request
 */
app.post('/claims', [
    body('claim_id').notEmpty().withMessage('Claim ID is required'),
    body('policy_id').notEmpty().withMessage('Policy ID is required'),
    body('date_of_claim').isDate().withMessage('Date of Claim must be a valid date'),
    body('claim_amount').isNumeric().withMessage('Claim Amount must be a number'),
    body('status').notEmpty().withMessage('Status is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const claim = new Claim(req.body);
        await claim.save();
        res.status(201).send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /claims/{claim_id}:
 *   get:
 *     summary: Retrieve a specific claim
 *     tags: [Claims]
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the claim to retrieve
 *     responses:
 *       200:
 *         description: A claim object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       404:
 *         description: Claim not found
 */
app.get('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOne({ claim_id: req.params.claim_id });
        if (!claim) return res.status(404).send('Claim not found');
        res.send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /claims/{claim_id}:
 *   put:
 *     summary: Update a claim
 *     tags: [Claims]
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the claim to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Claim'
 *     responses:
 *       200:
 *         description: The updated claim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       404:
 *         description: Claim not found
 */
app.put('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOneAndUpdate({ claim_id: req.params.claim_id }, req.body, { new: true, runValidators: true });
        if (!claim) return res.status(404).send('Claim not found');
        res.send(claim);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /claims/{claim_id}:
 *   delete:
 *     summary: Delete a claim
 *     tags: [Claims]
 *     parameters:
 *       - in: path
 *         name: claim_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the claim to delete
 *     responses:
 *       200:
 *         description: The claim was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Claim not found
 */
app.delete('/claims/:claim_id', async (req, res) => {
    try {
        const claim = await Claim.findOneAndDelete({ claim_id: req.params.claim_id });
        if (!claim) return res.status(404).send('Claim not found');
        res.send({ message: 'Claim deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});