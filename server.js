import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
// extension of file required
import connectDB from './config/db.js';

import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoute.js';

import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const port =process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server is listening at ${port}`.bgCyan.white)
})