import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/adoptme'
    )
    console.log('🟢 Conectado a MongoDB')
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message)
  }
}
