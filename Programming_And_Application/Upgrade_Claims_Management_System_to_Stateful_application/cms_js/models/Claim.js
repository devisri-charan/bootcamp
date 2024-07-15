const mongoose = require('mongoose');
const Policy = require('./Policy');
const Policyholder = require('./Policyholder');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
    claim_id: {
        type: String, required: true, unique: true, index: true
    },
    policy_id: {
        type: String, required: true, index: true, validate: {
            validator: async function (value) {
                const policy = await Policy.findOne({ policy_id: value });
                return policy != null;
            },
            message: 'Policy does not exist'
        }
    },
    policyholder_id: {
        type: String, required: true, index: true, validate: {
            validator: async function (value) {
                const policyholder = await Policyholder.findOne({policyholder_id: value});
                return policyholder != null;
            },
            message: 'Policyholder doesnot exist'
        }
    },
    date_of_claim: { type: Date, required: true, validate:{
        validator: async function (value) {
            const policy = await Policy.findOne({ policy_id: this.policy_id });
            return value >= policy.start_date && value <= policy.end_date;
        },
        message: 'Claim date must be after start date and before end date'
    }},
    claim_amount: {
        type: Number, required: true, validate: {
            validator: async function (value) {
                const policy = await Policy.findOne({ policy_id: this.policy_id });
                return value <= policy.coverage;
            },
            message: 'Claim amount must not exceed policy coverage'
        }
    },
    status: { type: String, default: "Pending"},
    reason_of_claim: { type: String, required: true}
}, { timestamps: true });

// Middleware to ensure proper UTF-8 encoding
claimSchema.pre('save', function(next) {
    for (let key in this.toObject()) {
        if (typeof this[key] === 'string') {
            this[key] = Buffer.from(this[key], 'utf-8').toString('utf-8');
        }
    }
    next();
});

module.exports = mongoose.model("Claim", claimSchema);