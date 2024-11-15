const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');

// const supabase = createClient(config.supabase.supabaseUrl, config.supabase.supabaseKey);
const supabase = createClient(config.supabase.supabaseUrl, config.supabase.supabaseServiceKey);


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

const uploadImage = async (bucketName,fileName,file) =>{
   
    const{data, error} = await supabase.storage.from(bucketName).upload(fileName, file);

    if(error){
        console.error('Upload error:', error.message);
        return null;
    }
    console.log('File uploaded:', data);
    return data?.path;
}


module.exports = {uploadImage};