const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
    policy_id: { type: String, required: true, unique: true, index: true },
    policyholder_id: { type: String, required: true, index: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    premium: { type: Number, required: true }
  });

  module.exports = mongoose.model("Policy", policySchema);