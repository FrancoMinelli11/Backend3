import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import __dirname from './utilsD.js';

console.log(__dirname + '/docs/*.yaml');
const swaggerOptions = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Pet Adoption API',
            version:'1.0.0',
            description:'API for managing pet adoptions'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions);
const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, () => {
    console.log('Connected to MongoDB');
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs));

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
