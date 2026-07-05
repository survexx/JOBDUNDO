import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Company = mongoose.Model('Company', companySchema);
export default Company;