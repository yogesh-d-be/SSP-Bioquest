const Counter = require('../models/counter.model');

const generateProductCode = async () =>{
    const updatedCounter = await Counter.findOneAndUpdate(
        {name:'productCode'},
        {$inc:{count:1}},
        {new:true, upsert:true}
    );

    const nextCount = updatedCounter.count;
    return `SSPBQ${String(nextCount).padStart(3,'0')}`;
};

module.exports ={ generateProductCode};
