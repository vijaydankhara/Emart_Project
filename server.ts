import express from 'express';
import dotenv from 'dotenv';
const server = express();
import mongoose from 'mongoose';
import adminRouter from './routes/admin/adminRouter';
import productRouter from './routes/admin/productRouter';

import userRouter from './routes/user/userRouter';
import userproductRouter from './routes/user/productRouter'
import whishlistRouter from './routes/user/wishlistRouter';

dotenv.config();
const port : Number = Number(process.env.PORT);
const dbURL : string = process.env.MONGO_DB_URL as string ;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// ------------------------- ADMIN API ---------------------------------------
server.use('/api/admin',adminRouter);
server.use('/api/admin',productRouter);


// ------------------------- USER API ---------------------------------------
server.use('/api/users',userRouter);
server.use('/api/user',userproductRouter);
server.use('/api/user',whishlistRouter);


server.listen(port, async () => {
    mongoose.connect(dbURL)
    .then(() => console.log('DB Is Connected ✔︎✔︎✔︎'))
    .catch(err => console.log(err.message));
    console.log(`server start at http://localhost:${port} ✔︎✔︎✔︎`);
});
