import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const PORT = 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
