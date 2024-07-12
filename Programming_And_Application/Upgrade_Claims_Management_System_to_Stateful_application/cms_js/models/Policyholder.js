const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policyholderSchema = new Schema({
  policyholder_id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model("Policyholder", policyholderSchema);