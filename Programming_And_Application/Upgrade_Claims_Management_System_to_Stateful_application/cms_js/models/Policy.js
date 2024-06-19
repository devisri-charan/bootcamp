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
  start_date: { type: Date, required: true},
  end_date: { type: Date, required: true, validate: {
    validator: function(value){
      return this.start_date < value;
    },
    message: 'End date must be after start date'
  }},
  premium: { type: Number, required: true }
});

module.exports = mongoose.model("Policy", policySchema);