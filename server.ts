import express from 'express';  
import dotenv from 'dotenv';
const server = express();
import mongoose from 'mongoose';

/*====================> || Admin Router Import Hear || <====================*/
import adminRouter from './routes/admin/adminRouter';
import productRouter from './routes/admin/productRouter';
import admincartRouter from './routes/admin/cartRouter';
import adminorderRouter from './routes/admin/orderRouter';
import adminreviewRouter from './routes/admin/reviewRouter';

/*====================> || User Router Import Hear || <====================*/
import userRouter from './routes/user/userRouter';
import userproductRouter from './routes/user/productRouter'
import whishlistRouter from './routes/user/wishlistRouter';
import cartRouter from './routes/user/cartRouter';
import orderRouter from './routes/user/orderRouter';
import contactRouter from './routes/user/contactRouter';
import reviewRouter from './routes/user/reviewRouter';

dotenv.config();
const port : Number = Number(process.env.PORT);   // server port
const dbURL : string = process.env.MONGO_DB_URL as string ;  // use for online database

server.use(express.json());
server.use(express.urlencoded({ extended: true }));  // use to add product photo uploded

// ------------------------- ADMIN API ---------------------------------------
server.use('/api/admin',adminRouter);
server.use('/api/admin',productRouter);
server.use('/api/admin',admincartRouter);
server.use('/api/admin',adminorderRouter);
server.use('/api/admin',adminreviewRouter);

// ------------------------- USER API ---------------------------------------
server.use('/api/users',userRouter);
server.use('/api/user',userproductRouter);
server.use('/api/user',whishlistRouter);
server.use('/api/user',cartRouter);
server.use('/api/user',orderRouter);
server.use('/api/user',contactRouter);
server.use('/api/user',reviewRouter);


server.listen(port, async () => {
    mongoose.connect(dbURL)  // online databases connected
    .then(() => console.log('DB Is Connected ✔︎✔︎✔︎'))
    .catch(err => console.log(err.message));
    console.log(`server start at http://localhost:${port} ✔︎✔︎✔︎`);
});
