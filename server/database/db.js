import mongoose from 'mongoose';


const DBConnection = async () =>{
    const Password = encodeURIComponent('jcu-L:v4Bc8GWy!');
    const MONGODB_URL =`mongodb+srv://Rohith_E:${Password}@file-sharing.ekv0vib.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing`;
    try{
       await mongoose.connect(MONGODB_URL,{useNewUrlParser:true});
        console.log('Database connected successfully');
    } 
    catch(error){
        console.error('Error while connecting with the database ',error.message);
    }
}
export default DBConnection;