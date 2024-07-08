const Policyholder = require('./models/Policyholder');
const Policy = require('./models/Policy');
const Claim = require('./models/Claim');

const generateUniqueID = async (Model, prefix = '', length = 8) => {
    let unique = false;
    let id;

    while (!unique) {
        id = prefix + Math.floor(10 ** (length - prefix.length - 1) + Math.random() * 9 * 10 ** (length - prefix.length - 1)).toString();
        const existingRecord = await Model.findOne({ [`${prefix ? `${prefix.toLowerCase()}_id` : 'id'}`]: id });
        if (!existingRecord) {
            unique = true;
        }
    }
    return id;
};

const generateUniquePolicyholderID = async () => {
    return await generateUniqueID(Policyholder, 'PH', 8);
};

const generateUniquePolicyID = async () => {
    return await generateUniqueID(Policy, 'POL', 8);
};

const generateUniqueClaimID = async () => {
    return await generateUniqueID(Claim, 'CLM', 8);
};

module.exports = {
    generateUniquePolicyholderID,
    generateUniquePolicyID,
    generateUniqueClaimID
};
