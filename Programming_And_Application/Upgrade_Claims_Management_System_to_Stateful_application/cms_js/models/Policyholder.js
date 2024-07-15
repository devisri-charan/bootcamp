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

// Middleware to ensure proper UTF-8 encoding
policyholderSchema.pre('save', function(next) {
  for (let key in this.toObject()) {
      if (typeof this[key] === 'string') {
          this[key] = Buffer.from(this[key], 'utf-8').toString('utf-8');
      }
  }
  next();
});

module.exports = mongoose.model("Policyholder", policyholderSchema);