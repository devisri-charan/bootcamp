const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
    claim_id: { type: String, required: true, unique: true, index: true },
    policy_id: { type: String, required: true, index: true },
    date_of_claim: { type: Date, required: true },
    claim_amount: { type: Number, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model("Claim", claimSchema);