const mongoose = require('mongoose');
const Policy = require('./Policy');
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
    date_of_claim: { type: Date, required: true, validate:{
        validator: async function (value) {
            const policy = await Policy.findOne({ policy_id: this.policy_id });
            return value >= policy.policy_start_date && value <= policy.policy_end_date;
        },
        message: 'Claim date must be after start date and before end date'
    }},
    claim_amount: {
        type: Number, required: true, validate: {
            validator: async function (value) {
                const policy = await Policy.findOne({ policy_id: this.policy_id });
                return value <= policy.premium;
            },
            message: 'Claim amount must not exceed policy premium'
        }
    },
    status: { type: String, required: true },
    reason_of_claim: { type: String, required: true}
});

module.exports = mongoose.model("Claim", claimSchema);