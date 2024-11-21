const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');
const ApiError = require('./apiError');

// const supabase = createClient(config.supabase.supabaseUrl, config.supabase.supabaseKey);
const supabase = createClient(config.supabase.supabaseUrl, config.supabase.supabaseServiceKey);
const supabaseAnon = createClient(config.supabase.supabaseUrl, config.supabase.supabaseKey);


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://your-supabase-url.supabase.co'
// const supabaseKey = 'your-supabase-key'
// const supabase = createClient(supabaseUrl, supabaseKey)

// async function createBucket(bucketName) {
//   const { data, error } = await supabase.storage.createBucket(bucketName, { public: true })

//   if (error) {
//     console.error('Error creating bucket:', error)
//   } else {
//     console.log('Bucket created successfully:', data)
//   }
// }

// createBucket('your_bucket_name')

const uploadFile = async (bucketName,fileName,file) =>{
    // const supabaseAuth = createClient(config.supabase.supabaseUrl, config.supabase.supabaseKey,{
    //     global: { headers: { Authorization: `Bearer ${token}` } }
    // });
    // console.log("toki",token)
    const{data, error} = await supabase.storage.from(bucketName).upload(fileName, file,{
        upsert:true
    });

    if(error){
        // console.error('Upload error:', error,error.details);
        throw new ApiError(500, "File upload failed.");
    }
    // console.log('File uploaded:', data);
    return data?.path;
}

// const generateFilePathURL = async () => {
//     try {
//         const { data, error } = await supabase
//             .from('sspbioquest') // Adjust table name if needed
//             .select('*'); // Select all fields or specify the required ones

//         if (error) {
//             console.error('Error fetching products:', error);
//             return null;
//         }

//         console.log('Products List:', data);
//         return data;
//     } catch (err) {
//         console.error('Unexpected error:', err.message);
//         return null;
//     }
// };



module.exports = {
    uploadFile,
    // generateFilePathURL
};