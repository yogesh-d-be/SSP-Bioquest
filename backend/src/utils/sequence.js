const Counter = require('../models/counter.model');


const generateCode = async (name, suffix, length = 3) =>{
    const updatedCounter = await Counter.findOneAndUpdate(
       {name:name},
        {$inc:{count:1}},
        {new:true, upsert:true}
    );

    const nextCount = updatedCounter.count;
    return `${suffix}${String(nextCount).padStart(length,'0')}`;
};


module.exports = generateCode;
