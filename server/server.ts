import express, { Application } from 'express';
import patientRouter from './routes/PatientRouter';
import dotenv from 'dotenv';
import { connectFirebase } from './config/FirebaseConfig';
import cors from 'cors';
import userRouter from './routes/UserRouter';

dotenv.config();

async function startServer() {
    const app: Application = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());
    app.use("/patients", patientRouter);
    app.use("/users", userRouter);

    await connectFirebase();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch(console.error);
