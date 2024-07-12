const mongoose = require('mongoose');
const Policyholder = require('./Policyholder');
const Schema = mongoose.Schema;

const policySchema = new Schema({
  policy_id: { type: String, required: true, unique: true, index: true },
  policyholder_id: {
    type: String, required: true, index: true, validate: {
      validator: async function (value) {
        const policyholder = await Policyholder.findOne({ policyholder_id: value });
        return policyholder != null;
      }
    }
  },
  policy_type: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  coverage: { type: Number, required: true },
  payments: [{
    payment_id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
  }],
  premium: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Policy", policySchema);