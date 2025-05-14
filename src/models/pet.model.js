import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
  age: Number,
  adopted: Boolean
});

const PetModel = mongoose.model('Pet', petSchema);

export default PetModel;
