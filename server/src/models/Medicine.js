import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    tags:{
        type: Array
    },
    subcategories:{
        type: Array
    }
})

medicineSchema.index({ title: 1, company: 1 }, { unique: true });

var Medicine = mongoose.model('medicine', medicineSchema)


export default Medicine;

// // DELETE ALL
// Medicine.deleteMany({}).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });
