import express from 'express';
import dotenv from 'dotenv';
const server = express();
import mongoose from 'mongoose';
// import adminsRoutes from './routes/admin/index.routes';
import userRouter from './routes/userRouter';
dotenv.config();
const port : Number = Number(process.env.PORT);
const dbURL : string = process.env.MONGO_DB_URL as string ;

server.use(express.json());

// /*----------------------------|| Admin Route ||-----------------------------------*/
// server.use('/api/admin', adminsRoutes)

// /*----------------------------|| user Route ||-----------------------------------*/
server.use('/api/users',userRouter);


server.listen(port, async () => {
    mongoose.connect(dbURL)
    .then(() => console.log('DB Is Connected ✔︎✔︎✔︎'))
    .catch(err => console.log(err.message));
    console.log(`server start at http://localhost:${port} ✔︎✔︎✔︎`);
});
