const mongoose = require('mongoose');

const partnerCompanySchema = new mongoose.Schema({
    companyImage:{
        type:Array,
        required:true
    }
},{
    collection:"PartnerCompany",
    timestamps:true
});

const partnerCompany = mongoose.model("PartnerCompany",partnerCompanySchema);

module.exports = partnerCompany;